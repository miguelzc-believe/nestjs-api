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
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PrismaExceptionFilter } from './http-exeption.filter';
import { SessionModule } from './session/session.module';
import { SmtpModule } from './smtp/smtp.module';
import { AuthGuard } from './auth/auth.guard';
import { SharedUserModule } from './shared-user/shared-user.module';

@Module({
  imports: [PrismaModule, UserModule, PostModule, OtbModule, AuthModule, SessionModule, SmtpModule, SharedUserModule],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },{
    provide: APP_FILTER,
    useClass: PrismaExceptionFilter,
  },AppService, PrismaService, SessionService,],
})
export class AppModule {}
