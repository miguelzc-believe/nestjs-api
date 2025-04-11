import { Module } from '@nestjs/common';
import { CommentGateway } from './comment.gateway';
import { CommentService } from './comment.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CommentGateway, CommentService],
  imports: [PrismaModule],
  exports: [CommentService],
})
export class CommentModule {}
