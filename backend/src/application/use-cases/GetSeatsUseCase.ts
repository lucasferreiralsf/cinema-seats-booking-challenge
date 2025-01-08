import { ICinemaSessionRepository } from '../../domain/repositories/ICinemaSessionRepository';
import { IHallRepository } from '../../domain/repositories/IHallRepository';
import { ISeatRepository } from '../../domain/repositories/ISeatRepository';

export class GetSeatsUseCase {
  constructor(
    private cinemaSessionRepository: ICinemaSessionRepository,
    private hallRepository: IHallRepository
  ) {}

  async execute(sessionId: number) {
    const session = await this.cinemaSessionRepository.getById(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }
    const hall = await this.hallRepository.getById(session.hallId);
    if (!hall) {
      throw new Error('Hall not found');
    }
    return hall.seats;
  }
}
