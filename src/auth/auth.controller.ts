import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/signInDto';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtPayload } from './dto/jwt-payload.dto';
import { SessionService } from 'src/session/session.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly sessionService : SessionService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user:JwtPayload) {
    return user
  }
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout (@CurrentUser() user:JwtPayload){
    await this.sessionService.updateSessionById(user.sessionId)
    return {'message': 'Logout successfully'}
  }
}
