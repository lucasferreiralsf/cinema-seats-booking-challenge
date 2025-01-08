import { ICinemaSessionRepository } from '../../domain/repositories/ICinemaSessionRepository';

export class GetSessionsUseCase {
  constructor(private cinemaSessionRepository: ICinemaSessionRepository) {}

  async execute() {
    return this.cinemaSessionRepository.getAll();
  }
}
