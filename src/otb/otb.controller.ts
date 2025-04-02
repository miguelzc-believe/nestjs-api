import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtbService } from './otb.service';
import { CreateOtbDto } from './dto/create-otb.dto';
import { UpdateOtbDto } from './dto/update-otb.dto';
import { VerifyOtbDto } from './dto/verify-otb.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('otb')
export class OtbController {
  constructor(private readonly otbService: OtbService) {}

  @Post()
  create(@Body() createOtbDto: CreateOtbDto) {
    return this.otbService.create(createOtbDto);
  }

  @Get()
  findAll() {
    return this.otbService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otbService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOtbDto: UpdateOtbDto) {
    return this.otbService.update(+id, updateOtbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otbService.remove(+id);
  }
  @Public()
  @Post("verify")
  verify(@Body() verifyOtbDto:VerifyOtbDto) {
    return this.otbService.findOtbByUserEmail(verifyOtbDto);
  }
}
