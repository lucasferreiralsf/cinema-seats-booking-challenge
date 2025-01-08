import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { Auth } from '../../domain/entities/Auth';
import argon2 from 'argon2';
import { prisma } from '../database/db';
import { User, UserWithoutPass } from '../../domain/entities/User';

export class AuthRepository implements IAuthRepository {
  async signUp(email: string, password: string): Promise<void> {
    const hashedPassword = await argon2.hash(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async signIn(
    email: string,
    password: string
  ): Promise<UserWithoutPass | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user && (await argon2.verify(user.password, password))) {
      return { email, id: user.id };
    }
    return null;
  }
}
