import { IReservationRepository } from '../../domain/repositories/IReservationRepository';
import {
  CreateReservation,
  Reservation,
} from '../../domain/entities/Reservation';
import { prisma, PrismaTransaction } from '../database/db';

export class ReservationRepository implements IReservationRepository {
  async create(
    reservation: CreateReservation,
    tx?: PrismaTransaction
  ): Promise<Reservation> {
    const client = tx ?? prisma;
    return client.reservation.create({
      data: {
        userId: reservation.userId,
        sessionId: reservation.sessionId,
        seatId: reservation.seatId,
      },
    });
  }
}
