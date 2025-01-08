import { Router } from 'express';
import { WebSocketServer } from 'ws';
import { ReserveSeatUseCase } from '../application/use-cases/ReserveSeatUseCase';
import { SeatController } from '../controllers/SeatController';
import { ReservationRepository } from '../infrastructure/repositories/ReservationRepository';
import { SeatRepository } from '../infrastructure/repositories/SeatRepository';
import { authenticateJWT } from '../middlewares/auth';

const reservationRepository = new ReservationRepository();
const seatRepository = new SeatRepository();
const reserveSeatUseCase = new ReserveSeatUseCase(
  reservationRepository,
  seatRepository
);
const router = Router();

export default (wss: WebSocketServer) => {
  const seatController = new SeatController(reserveSeatUseCase, wss);
  router.post('/sessions/:id/seats/reserve', authenticateJWT, (req, res) =>
    seatController.reserveSeat(req, res)
  );

  return router;
};
