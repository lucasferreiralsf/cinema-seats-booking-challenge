import { AuthData } from '../../domain/entities/Auth';

declare global {
  namespace Express {
    interface Request {
      user?: AuthData;
    }
  }
}
