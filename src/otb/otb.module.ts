import { Module } from '@nestjs/common';
import { OtbService } from './otb.service';
import { OtbController } from './otb.controller';

@Module({
  controllers: [OtbController],
  providers: [OtbService],
})
export class OtbModule {}
