import { faker } from '@faker-js/faker';
import argon2 from 'argon2';
import { prisma } from '../../infrastructure/database/db';
import { Hall } from '@prisma/client';
import { CreateSeat } from '../../domain/entities/Seat';
import { CreateCinemaSession } from '../../domain/entities/CinemaSession';

export async function seed() {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.reservation.deleteMany();
      await tx.cinemaSession.deleteMany();
      await tx.seat.deleteMany();
      await tx.hall.deleteMany();
      await tx.user.deleteMany();

      const users: { email: string; password: string }[] = [];
      for (let i = 0; i < 10; i++) {
        users.push({
          email: faker.internet.email(),
          password: await argon2.hash('test123'),
        });
      }

      await tx.user.createMany({ data: users, skipDuplicates: true });

      const halls: Hall[] = [];
      for (let i = 0; i < 10; i++) {
        halls.push({
          id: i + 1,
          name: faker.lorem.words({ min: 1, max: 3 }),
        });
      }
      await tx.hall.createMany({ data: halls, skipDuplicates: true });

      const seats: CreateSeat[] = [];
      halls.map((hall) => {
        for (let i = 0; i < faker.number.int({ min: 10, max: 50 }); i++) {
          seats.push({
            available: true,
            hallId: hall.id,
            row: faker.number.int({ min: 1, max: 5 }),
            number: i + 1,
          });
        }
      });
      await tx.seat.createMany({ data: seats, skipDuplicates: true });

      const sessions: CreateCinemaSession[] = [];
      halls.map((hall) => {
        for (let i = 0; i < faker.number.int({ min: 2, max: 10 }); i++) {
          sessions.push({
            hallId: hall.id,
            movie: faker.book.title(),
            startTime: faker.date.future(),
          });
        }
      });
      await tx.cinemaSession.createMany({
        data: sessions,
        skipDuplicates: true,
      });
    });
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
