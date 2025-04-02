import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { SessionService } from 'src/session/session.service';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [
    SessionModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
