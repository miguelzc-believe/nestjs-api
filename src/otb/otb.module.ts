import { Module } from '@nestjs/common';
import { OtbService } from './otb.service';
import { OtbController } from './otb.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SharedUserModule } from 'src/shared-user/shared-user.module';

@Module({
  imports: [PrismaModule,SharedUserModule],
  controllers: [OtbController],
  providers: [OtbService],
  exports: [OtbService],
})
export class OtbModule {}
