import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OtbModule } from 'src/otb/otb.module';
import { SmtpModule } from 'src/smtp/smtp.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [PrismaModule,OtbModule,SmtpModule],
})
export class UserModule {}
