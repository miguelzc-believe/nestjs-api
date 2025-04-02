import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { SessionModule } from 'src/session/session.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [PrismaModule, AuthModule, SessionModule],
})
export class PostModule {}
