import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signInDto';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtPayload } from './dto/jwt-payload.dto';
import { Public } from './decorators/public.decorator';
import { SessionService } from 'src/session/session.service';
import { UserService } from 'src/user/user.service';
import { ApiBasicAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserResponse } from 'src/user/entities/user.entity';
import { AuthResponse } from './entities/auth.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly sessionService : SessionService, private readonly userService : UserService) {}

  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ type: String })
  @ApiOperation({ summary: 'Iniciar Sesion' })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: 'Obtener el perfil del usuario' })
  @ApiOkResponse({ type: AuthResponse })
  @ApiBasicAuth('access-token')
  @Get('profile')
  getProfile(@CurrentUser() user:JwtPayload) {
    const profile = this.userService.findOne(user.userId)
    return profile; 
  }


  @ApiBasicAuth('access-token')
  @ApiOperation({ summary: 'Cerrar sesion' })
  @ApiOkResponse({ type: String })
  @Post('logout')
  async logout (@CurrentUser() user:JwtPayload){
    await this.sessionService.updateSessionById(user.sessionId)
    return {'message': 'Logout successfully'}
  }
}
