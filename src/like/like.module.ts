import { Module } from '@nestjs/common';
import { LikeGateway } from './like.gateway';

@Module({
  providers: [LikeGateway]
})
export class LikeModule {}
