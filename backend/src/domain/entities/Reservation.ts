import { Reservation as PrismaReservation } from '@prisma/client';

export type Reservation = PrismaReservation & {};
export type CreateReservation = Omit<
  PrismaReservation,
  'id' | 'createdAt'
> & {};
