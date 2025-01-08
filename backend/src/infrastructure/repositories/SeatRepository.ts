import { Seat } from '../../domain/entities/Seat';
import { ISeatRepository } from '../../domain/repositories/ISeatRepository';
import { prisma, PrismaTransaction } from '../database/db';

export class SeatRepository implements ISeatRepository {
  async getById(id: number, tx?: PrismaTransaction): Promise<Seat | null> {
    const client = tx ?? prisma;
    const data = await client.seat.findUnique({
      where: { id },
    });

    return data;
  }

  async update(seat: Seat, tx?: PrismaTransaction): Promise<Seat> {
    const client = tx ?? prisma;
    return client.seat.update({
      where: { id: seat.id },
      data: { available: seat.available },
    });
  }
}
