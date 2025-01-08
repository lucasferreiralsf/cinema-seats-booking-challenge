import { CinemaSession } from './CinemaSession.type';
import { Seat } from './Seat.type';

export interface Hall {
  id: number;
  name: string;
  seats: Seat[];
  CinemaSession: CinemaSession[];
}
