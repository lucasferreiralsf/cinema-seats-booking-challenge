import { Seat as PrismaSeat } from '@prisma/client';

export type Seat = PrismaSeat & {};
export type CreateSeat = Omit<Seat, 'id'> & {};
