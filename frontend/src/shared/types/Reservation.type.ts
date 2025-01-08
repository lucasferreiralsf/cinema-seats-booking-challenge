import { CinemaSession } from './CinemaSession.type';
import { Seat } from './Seat.type';

export interface Reservation {
  id: string;
  userId: string;
  sessionId: string;
  seatId: string;
  createdAt: string;
  session: CinemaSession;
  seat: Seat;
}
