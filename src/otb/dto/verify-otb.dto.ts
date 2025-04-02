import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyOtbDto {
    @IsString({ message: 'The email must be a string' })
    @IsNotEmpty({ message: 'The email cannot be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
    
    @IsString({ message: 'The token must be a string' })
    @IsNotEmpty({ message: 'The token cannot be empty' })
    token: string;
}