import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OtbService } from 'src/otb/otb.service';
import { generateTokenOtb } from 'src/auth/utils/authUtils';
import { SmtpService } from 'src/smtp/smtp.service';
import { UpdateUserPasswordDto } from './dto/update-user-password';
import { SessionService } from 'src/session/session.service';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
const bcrypt = require('bcrypt');
@Injectable()
export class UserService {
  constructor(private readonly dbClient: PrismaService,
    private readonly otbService:OtbService, 
    private readonly smtService:SmtpService,
    private readonly sessionService:SessionService) {}
  
  async create(createUserDto: CreateUserDto) {
    const birthDate= new Date(createUserDto.birthDate);
    const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);
    const u= this.dbClient.user.create({
      data:{
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: encryptedPassword,
        state: false,
        birthDate,
      }
    });
    if(!u) throw new Error("Error creating user");
    const t=generateTokenOtb()
    const otb= await this.otbService.create({userId:(await u).id,token:+t});
    await this.smtService.sendEmail({email: (await u).email,token:t});
    return "User created successfully, please check your email to confirm your account";
  }

  findAll() {
    return this.dbClient.user.findMany({
      where: { state: true },
      select: {
        firstName: true,
        lastName: true, 
        email: true,
        birthDate: true,
      }});
  }


  findOne(id: string) {
    return this.dbClient.user.findUnique({
      where: { id },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        birthDate: true,
      }});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if(updateUserDto.password || updateUserDto.passwordConfirmation) throw new BadRequestException("You cannot update the password here, please use the updatePassword method");
    if(updateUserDto.email) throw new BadRequestException("You cannot update the email here");
    if(updateUserDto.birthDate) updateUserDto.birthDate= new Date(updateUserDto.birthDate);
    return this.dbClient.user.update({
      where: { id },
      data: {
        ...updateUserDto
        },
        select:{
          firstName: true,
          lastName: true,
          email: true,
          birthDate: true,
        }
        },);
  }

  async remove(id: string) {
    await this.dbClient.user.delete({
      where: { id },
    });
    return "User removed successfully";
  }

  async updatePassword(payload:JwtPayload,updateUserPasswordDto:UpdateUserPasswordDto) {
    
    const encryptedPassword = await bcrypt.hash(updateUserPasswordDto.newPassword, 10);
    await this.dbClient.user.update({
      where: { id: payload.userId },
      data: {
        password: encryptedPassword,
      },
    });
    this.sessionService.closeAllSessions({userId: payload.userId, sessionId:payload.sessionId });
    return "Password updated successfully";
  }

}
