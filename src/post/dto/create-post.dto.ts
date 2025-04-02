import { IsString, MinLength } from "class-validator";

export class CreatePostDto {
    @MinLength(3,{message:'Titulo tiene que tener al menos 3 caracteres'})
    title: string;
    @IsString()
    content: string;
}
