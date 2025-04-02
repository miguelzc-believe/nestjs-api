import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SessionService {
  private dbClient: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.dbClient = prisma;
  }
  async isEnabled(sessionId: string): Promise<boolean | null> {
    const session = await this.dbClient.session.findUnique({
      where: { id: sessionId },
      select: { isEnabled: true },
    });
    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`);
    }
    return session.isEnabled;
  }
}
