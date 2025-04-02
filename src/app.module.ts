import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { SessionService } from './session/session.service';
import { PostModule } from './post/post.module';
import { OtbModule } from './otb/otb.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [PrismaModule, UserModule, PostModule, OtbModule, AuthModule, SessionModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, SessionService],
})
export class AppModule {}
