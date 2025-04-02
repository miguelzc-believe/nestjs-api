import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { SessionModule } from 'src/session/session.module';
import { AuthGuard } from './auth.guard';
import { SmtpModule } from 'src/smtp/smtp.module';

@Module({
  imports: [
    SmtpModule,
    SessionModule,
    JwtModule.register({
      global: true,
      secret: process.env.KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
