import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OtbModule } from 'src/otb/otb.module';
import { SmtpModule } from 'src/smtp/smtp.module';
import { AuthModule } from 'src/auth/auth.module';
import { SessionModule } from 'src/session/session.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SessionModule,PrismaModule,OtbModule,SmtpModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
