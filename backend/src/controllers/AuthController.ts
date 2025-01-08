import { Request, Response } from 'express';
import { SignUpUseCase } from '../application/use-cases/SignupUseCase';
import { SignInUseCase } from '../application/use-cases/SigninUseCase';

export class AuthController {
  constructor(
    private signUpUseCase: SignUpUseCase,
    private signInUseCase: SignInUseCase
  ) {}

  async signUp(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      await this.signUpUseCase.execute(email, password);
      res.status(201).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.signInUseCase.execute(email, password);
      if (result) {
        res.json(result);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
