import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateOtbDto {
    @IsString({ message: 'El uuid debe ser una cadena' })
    @IsNotEmpty({ message: 'El uuid no puede ir vacío' })
    userId: string;
    
    @IsInt({message:'el token debe ser numerico'})
    @IsNotEmpty({ message: 'El token no puede ir vacío' })
    @Min(999, { message: 'El token debe ser de 4 digitos' })
    @Max(9999, { message: 'El token debe ser de 4 digitos' })
    token: number;
}
