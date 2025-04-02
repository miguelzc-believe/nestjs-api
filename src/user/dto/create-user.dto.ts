// create-user.dto.ts
import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { Match } from '../decorator/match.decorator';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser una cadena' })
  @IsNotEmpty({ message: 'El nombre no puede ir vacío' })
  //@MaxLength(80, { message: 'El nombre no puede tener más de 80 caracteres' })
  firstName: string;

  @IsString({ message: 'El apellido debe ser una cadena' })
  @IsNotEmpty({ message: 'El apellido no puede ir vacío' })
  @MaxLength(100, { message: 'El apellido no puede tener más de 100 caracteres' })
  lastName: string;

  @IsEmail({}, { message: 'Email no válido' })
  @IsNotEmpty({ message: 'El email no puede ir vacío' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena' })
  @MinLength(8, { message: 'El password es muy corto, mínimo 8 caracteres' })
  @MaxLength(255, { message: 'La contraseña no puede tener más de 255 caracteres' })
  @Matches(/[A-Z]/, { message: 'Debe contener al menos una letra mayúscula' })
  @Matches(/[a-z]/, { message: 'Debe contener al menos una letra minúscula' })
  @Matches(/\d/, { message: 'Debe contener al menos un número' })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Debe contener al menos un símbolo especial' })
  password: string;

  @IsString({ message: 'La confirmación de la contraseña debe ser una cadena' })
  @Match('password', { message: 'Los passwords no son iguales' })
  passwordConfirmation: string;

  @IsString({ message: 'La fecha de nacimiento debe ser una cadena en formato YYYY-MM-DD' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Inserte una fecha en formato YYYY-MM-DD' })
  birthDate: Date;
}
