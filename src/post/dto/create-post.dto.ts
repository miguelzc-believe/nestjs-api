import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreatePostDto {
    @ApiProperty({ example: 'titulo del post' })
    @MinLength(3,{message:'Titulo tiene que tener al menos 3 caracteres'})
    title: string;
    @ApiProperty({ example: 'contenido del post' })
    @IsString()
    content: string;
}
