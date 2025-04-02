import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionService {
  constructor(private readonly dbClient: PrismaService) {}
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
  async createSession(sessionDto: CreateSessionDto) {
    return this.dbClient.session.create({
      data: {
        ...sessionDto,
      },
    });
  }
  async updateSessionById(id: string) {
    const session = this.dbClient.session.findFirst({
      where: {
        id,
      },
    });
    if (!session)
      throw new NotFoundException(`Session with ID ${id} not found`);
    return this.dbClient.session.update({
      where: {
        id,
      },
      data: {
        isEnabled: false,
      },
    });
  }
}
