import { Module } from '@nestjs/common';
import { SharedUserService } from './shared-user.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [SharedUserService],
  imports: [PrismaModule],
  exports: [SharedUserService],
})
export class SharedUserModule {


}
