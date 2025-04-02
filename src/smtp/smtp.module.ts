import { Module } from '@nestjs/common';
import { SmtpService } from './smtp.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [SmtpService],
  exports: [SmtpService],
  imports: [PrismaModule],
})
export class SmtpModule {}
