import { Hall } from './Hall.type';
import { Reservation } from './Reservation.type';

export interface CinemaSession {
  id: number;
  hallId: string;
  movie: string;
  startTime: string;
  seats: string;
  reservations: Reservation[];
  hall: Hall;
}
