import { CinemaSession } from '../entities/CinemaSession';

export interface ICinemaSessionRepository {
  getAll(): Promise<CinemaSession[]>;
  getById(id: number): Promise<CinemaSession | null>;
}
