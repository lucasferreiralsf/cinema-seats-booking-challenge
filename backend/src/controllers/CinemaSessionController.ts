import { Request, Response } from 'express';
import { GetSessionsUseCase } from '../application/use-cases/GetSessionsUseCase';
import { GetSeatsUseCase } from '../application/use-cases/GetSeatsUseCase';

export class CinemaSessionController {
  constructor(
    private getSessionsUseCase: GetSessionsUseCase,
    private getSeatsUseCase: GetSeatsUseCase
  ) {}

  async getSessions(req: Request, res: Response) {
    try {
      const sessions = await this.getSessionsUseCase.execute();
      res.json(sessions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSeats(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const seats = await this.getSeatsUseCase.execute(Number(id));
      res.json(seats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
