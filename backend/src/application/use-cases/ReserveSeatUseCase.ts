import { IReservationRepository } from '../../domain/repositories/IReservationRepository';
import { ISeatRepository } from '../../domain/repositories/ISeatRepository';
import { prisma } from '../../infrastructure/database/db';

export class ReserveSeatUseCase {
  constructor(
    private reservationRepository: IReservationRepository,
    private seatRepository: ISeatRepository
  ) {}

  async execute(userId: string, sessionId: number, seatId: number) {
    return prisma.$transaction(async (tx) => {
      const seat = await this.seatRepository.getById(seatId, tx);

      if (!seat || !seat.available) {
        throw new Error('Seat not available');
      }
      seat.available = false;
      await this.seatRepository.update(seat, tx);

      const createdReservation = await this.reservationRepository.create(
        {
          userId,
          seatId,
          sessionId,
        },
        tx
      );

      return { ...createdReservation, seat };
    });
  }
}
