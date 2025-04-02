import { Module } from '@nestjs/common';
import { OtbService } from './otb.service';
import { OtbController } from './otb.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SmtpModule } from 'src/smtp/smtp.module';

@Module({
  imports: [PrismaModule,SmtpModule],
  controllers: [OtbController],
  providers: [OtbService],
  exports: [OtbService],
})
export class OtbModule {}
