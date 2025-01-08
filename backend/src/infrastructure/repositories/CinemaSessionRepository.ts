import { ICinemaSessionRepository } from '../../domain/repositories/ICinemaSessionRepository';
import { CinemaSession } from '../../domain/entities/CinemaSession';
import { prisma } from '../database/db';

export class CinemaSessionRepository implements ICinemaSessionRepository {
  async getAll(): Promise<CinemaSession[]> {
    return prisma.cinemaSession.findMany({
      include: { hall: true, seats: true },
    });
  }

  async getById(id: number): Promise<CinemaSession | null> {
    return prisma.cinemaSession.findUnique({
      where: { id },
      include: { seats: true, hall: true },
    });
  }
}
