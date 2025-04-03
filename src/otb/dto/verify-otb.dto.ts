import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyOtbDto {
    @ApiProperty()
    @IsString({ message: 'The email must be a string' })
    @IsNotEmpty({ message: 'The email cannot be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
    
    @ApiProperty()
    @IsString({ message: 'The token must be a string' })
    @IsNotEmpty({ message: 'The token cannot be empty' })
    token: string;
}