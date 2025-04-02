import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  password: string;
}
