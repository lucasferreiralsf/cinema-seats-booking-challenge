import { PrismaTransaction } from '../../infrastructure/database/db';
import { Seat } from '../entities/Seat';

export interface ISeatRepository {
  getById(id: number, tx?: PrismaTransaction): Promise<Seat | null>;
  update(seat: Seat, tx?: PrismaTransaction): Promise<Seat>;
}
