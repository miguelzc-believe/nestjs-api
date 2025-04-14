import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ example: 'Contenido del comentario' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  content: string;
}
