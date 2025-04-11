import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ example: 'Contenido del comentario' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  commentId: string;
}
