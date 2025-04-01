import { Injectable } from '@nestjs/common';
import { CreateOtbDto } from './dto/create-otb.dto';
import { UpdateOtbDto } from './dto/update-otb.dto';

@Injectable()
export class OtbService {
  create(createOtbDto: CreateOtbDto) {
    return 'This action adds a new otb';
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
