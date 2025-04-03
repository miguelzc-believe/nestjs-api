import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtbService } from './otb.service';
import { VerifyOtbDto } from './dto/verify-otb.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Otb')
@Controller('otb')
export class OtbController {
  constructor(private readonly otbService: OtbService) {}

  @ApiBody({ type: VerifyOtbDto })
  @ApiOperation({ summary: 'Verificar token OTP' })
  @ApiOkResponse({type: String})
  @Public()
  @Post("verify")
  verify(@Body() verifyOtbDto:VerifyOtbDto) {
    return this.otbService.findOtbByUserEmail(verifyOtbDto);
  }
}
