import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({ example: 'titulo del post' ,required: false})
  @MinLength(3, { message: 'Titulo tiene que tener al menos 3 caracteres' })
  title: string;
  @ApiProperty({ example: 'contenido del post', required: false })
  @IsString()
  content: string;
}
