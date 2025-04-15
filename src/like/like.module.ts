import { Module } from '@nestjs/common';
import { LikeGateway } from './like.gateway';
import { LikeService } from './like.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LikeController } from './like.controller';

@Module({
  providers: [LikeGateway, LikeService],
  imports:[PrismaModule],
  exports:[LikeService],
  controllers:[LikeController]
})
export class LikeModule {}
