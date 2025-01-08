import { Request, Response } from 'express';
import { ReserveSeatUseCase } from '../application/use-cases/ReserveSeatUseCase';
import { WebSocketServer } from 'ws';

export class SeatController {
  constructor(
    private reserveSeatUseCase: ReserveSeatUseCase,
    private wss: WebSocketServer
  ) {}

  async reserveSeat(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { userId } = req.user;
      const { seatId } = req.body;
      const reservation = await this.reserveSeatUseCase.execute(
        userId,
        Number(id),
        Number(seatId)
      );

      res.json(reservation);

      this.wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(
            JSON.stringify({
              sessionId: id,
              seatId: reservation.seat.id,
              available: reservation.seat.available,
            })
          );
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
