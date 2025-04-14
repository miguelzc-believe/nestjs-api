import { Module } from '@nestjs/common';
import { CommentGateway } from './comment.gateway';
import { CommentService } from './comment.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommentController } from './comment.controller';

@Module({
  providers: [CommentGateway, CommentService],
  imports: [PrismaModule],
  exports: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
