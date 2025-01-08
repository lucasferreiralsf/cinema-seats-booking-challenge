import { CinemaSession as PrismaCinemaSession } from '@prisma/client';
import { Hall } from './Hall';
import { Seat } from './Seat';

export type CinemaSession = PrismaCinemaSession & {
  hall: Hall;
  seats: Seat[];
};

export type CreateCinemaSession = Omit<PrismaCinemaSession, 'id'> & {};
