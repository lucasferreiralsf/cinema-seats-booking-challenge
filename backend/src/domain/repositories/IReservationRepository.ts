import { PrismaTransaction } from '../../infrastructure/database/db';
import { CreateReservation, Reservation } from '../entities/Reservation';

export interface IReservationRepository {
  create(
    reservation: CreateReservation,
    tx?: PrismaTransaction
  ): Promise<Reservation>;
}
