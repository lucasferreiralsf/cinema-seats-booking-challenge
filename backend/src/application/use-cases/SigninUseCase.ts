import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { Auth, AuthData } from '../../domain/entities/Auth';
import jwt from 'jsonwebtoken';

export class SignInUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(
    email: string,
    password: string
  ): Promise<{ token: string } | null> {
    const user = await this.authRepository.signIn(email, password);
    if (user) {
      const token = jwt.sign(
        { userId: user.id, email: user.email } as AuthData,
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );
      return { token };
    }
    return null;
  }
}
