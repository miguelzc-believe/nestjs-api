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

@Module({
  imports: [PrismaModule, UserModule, PostModule, OtbModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, SessionService],
})
export class AppModule {}
