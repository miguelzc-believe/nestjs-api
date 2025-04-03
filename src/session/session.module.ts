import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [SessionService],
  exports: [SessionService],
  imports: [PrismaModule],
})
export class SessionModule {}
