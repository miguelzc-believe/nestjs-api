import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { first } from 'rxjs';
import { UserResponse } from './entities/user.entity';

@ApiTags('User')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Crear nuevo usuario' })
  @ApiOkResponse({type:String})
  @Public()
  @Post("create-account")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, type: UserResponse, isArray: true })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiResponse({ status: 200,type:UserResponse })
  @Patch("/edit")
  update( @CurrentUser() user:JwtPayload, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.userId, updateUserDto);
  }

  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiOkResponse({type:String})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Delete()
  remove(@CurrentUser() user:JwtPayload) {
    return this.userService.remove(user.userId);
  }

  @ApiOperation({ summary: 'Actualizar contraseña de usuario' })
  @ApiOkResponse({type: String})
  @Patch('updatePassword')
  updatePassword(@CurrentUser() user:JwtPayload,@Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.userService.updatePassword(user,updateUserPasswordDto);
  }
}
