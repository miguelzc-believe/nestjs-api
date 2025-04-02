import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { J } from '@faker-js/faker/dist/airline-CBNP41sR';
import { JwkKeyExportOptions } from 'crypto';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("create-account")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get()
  findOne(@CurrentUser() user:JwtPayload) {
    return this.userService.findOne(user.userId);
  }

  @UseGuards(AuthGuard)
  @Patch("/edit")
  update( @CurrentUser() user:JwtPayload, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.userId, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  remove(@CurrentUser() user:JwtPayload) {
    return this.userService.remove(user.userId);
  }
  @UseGuards(AuthGuard)
  @Patch('updatePassword')
  updatePassword(@CurrentUser() user:JwtPayload,@Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.userService.updatePassword(user,updateUserPasswordDto);
  }
}
