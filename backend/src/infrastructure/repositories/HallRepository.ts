import { HallWithSeats } from '../../domain/entities/Hall';
import { IHallRepository } from '../../domain/repositories/IHallRepository';
import { prisma, PrismaTransaction } from '../database/db';

export class HallRepository implements IHallRepository {
  async getById(
    id: number,
    tx?: PrismaTransaction
  ): Promise<HallWithSeats | null> {
    const client = tx ?? prisma;
    return client.hall.findUnique({
      where: { id },
      include: { seats: true },
    });
  }
}
