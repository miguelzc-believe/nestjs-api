import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = {
      email,
      password: pass,
    };
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { userEmail: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
