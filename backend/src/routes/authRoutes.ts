import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthRepository } from '../infrastructure/repositories/AuthRepository';
import { SignUpUseCase } from '../application/use-cases/SignupUseCase';
import { SignInUseCase } from '../application/use-cases/SigninUseCase';

const authRepository = new AuthRepository();
const signUpUseCase = new SignUpUseCase(authRepository);
const signInUseCase = new SignInUseCase(authRepository);
const authController = new AuthController(signUpUseCase, signInUseCase);

const router = Router();

router.post('/signup', (req, res) => authController.signUp(req, res));
router.post('/signin', (req, res) => authController.signIn(req, res));

export default router;
