import { Hall as PrismaHall } from '@prisma/client';
import { Seat } from './Seat';

export type Hall = PrismaHall & {};
export type HallWithSeats = PrismaHall & {
  seats: Seat[];
};
export type CreateHall = Omit<Hall, 'id'> & {};
