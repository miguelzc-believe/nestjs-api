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
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly sessionService : SessionService, private readonly userService : UserService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('profile')
  getProfile(@CurrentUser() user:JwtPayload) {
    const profile = this.userService.findOne(user.userId)
    return profile; 
  }

  @Post('logout')
  async logout (@CurrentUser() user:JwtPayload){
    await this.sessionService.updateSessionById(user.sessionId)
    return {'message': 'Logout successfully'}
  }
}
