import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post("create-account")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  findOne(@CurrentUser() user:JwtPayload) {
    return this.userService.findOne(user.userId);
  }

  @Patch("/edit")
  update( @CurrentUser() user:JwtPayload, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.userId, updateUserDto);
  }

  @Delete()
  remove(@CurrentUser() user:JwtPayload) {
    return this.userService.remove(user.userId);
  }
  @Patch('updatePassword')
  updatePassword(@CurrentUser() user:JwtPayload,@Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.userService.updatePassword(user,updateUserPasswordDto);
  }
}
