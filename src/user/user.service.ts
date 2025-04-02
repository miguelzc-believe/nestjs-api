import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OtbService } from 'src/otb/otb.service';
import { th } from '@faker-js/faker/.';
import { generateTokenOtb, sendEmail } from 'src/auth/utils/authUtils';
const bcrypt = require('bcrypt');
@Injectable()
export class UserService {
  constructor(private readonly dbClient: PrismaService,private readonly otbService:OtbService) {}
  findUserByEmail(email: string) {
    return this.dbClient.user.findUnique({
      where:{
        email
      }
    })
  }
  async create(createUserDto: CreateUserDto) {
    const birthDate= new Date(createUserDto.birthDate);
    const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);
    const u= this.dbClient.user.create({
      data:{
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: encryptedPassword,
        state: true,
        birthDate,
      }
    });
    if(!u) throw new Error("Error creating user");
    const t=generateTokenOtb()
    const otb= await this.otbService.create({userId:(await u).id,token:+t});
    await sendEmail((await u).email,t);
    return "User created successfully, please check your email to confirm your account";
  }

  findAll() {
    return `This action returns all user`;
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
