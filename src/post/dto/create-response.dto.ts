import { ApiProperty } from '@nestjs/swagger';

export class CreatePostResponseDto {
  @ApiProperty({ example: 'Post created successfully' })
  message: string;

  @ApiProperty({ format: 'uuid', example: 'c03a0339-283a-4a79-83e3-6fc85441ce0d' })
  postId: string;
}