import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { prisma } from '../database/db';
import { PrismaClient } from '@prisma/client';

export class UserRepository implements IUserRepository {
  constructor(private db: PrismaClient) {}

  getByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  async getById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}
