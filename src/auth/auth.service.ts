import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signInDto';
import { randomUUID } from 'crypto';
import { generateJWT } from './utils/authUtils';
import { SessionService } from 'src/session/session.service';
import { CreateSessionDto } from 'src/session/dto/create-session.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}
  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.userService.findUserByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const pass = await bcrypt.compare(signInDto.password, user.password);
    if (!pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const sessionId = randomUUID().toString();
    const token = await this.jwtService.signAsync({
      userId: user.id,
      sessionId: sessionId,
    });
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await this.sessionService.createSession({
      id: sessionId,
      userId: user.id,
      token,
      isEnabled: true,
      lifetime: 3600,
      timeOut: expirationDate,
    });
    return {
      access_token: 'Bearer ' + token,
    };
  }
}
