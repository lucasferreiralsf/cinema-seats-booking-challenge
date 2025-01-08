import { PrismaTransaction } from '../../infrastructure/database/db';
import { HallWithSeats } from '../entities/Hall';

export interface IHallRepository {
  getById(id: number, tx?: PrismaTransaction): Promise<HallWithSeats | null>;
}
