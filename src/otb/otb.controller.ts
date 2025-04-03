import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtbService } from './otb.service';
import { VerifyOtbDto } from './dto/verify-otb.dto';
import { Public } from 'src/auth/decorators/public.decorator';


@Controller('otb')
export class OtbController {
  constructor(private readonly otbService: OtbService) {}


  @Public()
  @Post("verify")
  verify(@Body() verifyOtbDto:VerifyOtbDto) {
    return this.otbService.findOtbByUserEmail(verifyOtbDto);
  }
}
