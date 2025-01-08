import { Router } from 'express';
import { CinemaSessionController } from '../controllers/CinemaSessionController';
import { CinemaSessionRepository } from '../infrastructure/repositories/CinemaSessionRepository';
import { GetSessionsUseCase } from '../application/use-cases/GetSessionsUseCase';
import { GetSeatsUseCase } from '../application/use-cases/GetSeatsUseCase';
import { authenticateJWT } from '../middlewares/auth';
import { HallRepository } from '../infrastructure/repositories/HallRepository';

const cinemaSessionRepository = new CinemaSessionRepository();
const hallRepository = new HallRepository();
const getSessionsUseCase = new GetSessionsUseCase(cinemaSessionRepository);
const getSeatsUseCase = new GetSeatsUseCase(
  cinemaSessionRepository,
  hallRepository
);
const cinemaSessionController = new CinemaSessionController(
  getSessionsUseCase,
  getSeatsUseCase
);

const router = Router();

router.get('/sessions', (req, res) =>
  cinemaSessionController.getSessions(req, res)
);
router.get('/sessions/:id/seats', (req, res) =>
  cinemaSessionController.getSeats(req, res)
);

export default router;
