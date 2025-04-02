import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionModule } from 'src/session/session.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [PrismaModule, SessionModule],
})
export class PostModule {}
