import { Injectable } from '@nestjs/common';
import { CreateOtbDto } from './dto/create-otb.dto';
import { UpdateOtbDto } from './dto/update-otb.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyOtbDto } from './dto/verify-otb.dto';
import { UserService } from 'src/user/user.service';
import { SmtpService } from 'src/smtp/smtp.service';
import { SharedUserService } from 'src/shared-user/shared-user.service';

@Injectable()
export class OtbService {
  constructor(private readonly dbClient: PrismaService, private readonly sharedUserService:SharedUserService) {}
  create(createOtbDto: CreateOtbDto) {
    return this.dbClient.otb.create({
      data: {
        ...createOtbDto
      }})
  }

  async findOtbByUserEmail(verifyOtbDto:VerifyOtbDto) {
    const user= await this.sharedUserService.findUserByEmail(verifyOtbDto.email);
    if(!user) throw new Error("User not found");
    if(user.state) throw new Error("User already verified");
    const t= await this.dbClient.otb.findFirst({
      where: {
        userId:user.id,
        token:+verifyOtbDto.token
      }
    });
    if(!t) {throw new Error("Token OTP not found")};
    await this.sharedUserService.updateUserState(user.id);
    await this.dbClient.otb.delete({
      where: {
        id:t.id
      }
    });
    return "Token OTP verified successfully";
  }
  findAll() {
    return `This action returns all otb`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otb`;
  }

  update(id: number, updateOtbDto: UpdateOtbDto) {
    return `This action updates a #${id} otb`;
  }

  remove(id: number) {
    return `This action removes a #${id} otb`;
  }
}
