import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/signInDto';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtPayload } from './dto/jwt-payload.dto';
import { Public } from './decorators/public.decorator';
import { SessionService } from 'src/session/session.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly sessionService : SessionService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('profile')
  getProfile(@CurrentUser() user:JwtPayload) {
    return user
  }

  @Post('logout')
  async logout (@CurrentUser() user:JwtPayload){
    await this.sessionService.updateSessionById(user.sessionId)
    return {'message': 'Logout successfully'}
  }
}
