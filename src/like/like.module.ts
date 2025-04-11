import { Module } from '@nestjs/common';
import { LikeGateway } from './like.gateway';
import { LikeService } from './like.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [LikeGateway, LikeService],
  imports:[PrismaModule],
  exports:[LikeService]
})
export class LikeModule {}
