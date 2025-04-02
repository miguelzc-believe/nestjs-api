import { Injectable } from '@nestjs/common';
import { CreateOtbDto } from './dto/create-otb.dto';
import { UpdateOtbDto } from './dto/update-otb.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OtbService {
  constructor(private readonly dbClient: PrismaService) {}
  create(createOtbDto: CreateOtbDto) {
    return this.dbClient.otb.create({
      data: {
        ...createOtbDto
      }})
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
