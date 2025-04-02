import { IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";
import { Match } from "../decorator/match.decorator";

export class UpdateUserPasswordDto {

    @IsString({ message: 'La contraseña debe ser una cadena' })
    @MinLength(8, { message: 'El password es muy corto, mínimo 8 caracteres' })
    @MaxLength(255, { message: 'La contraseña no puede tener más de 255 caracteres' })
    @Matches(/[A-Z]/, { message: 'Debe contener al menos una letra mayúscula' })
    @Matches(/[a-z]/, { message: 'Debe contener al menos una letra minúscula' })
    @Matches(/\d/, { message: 'Debe contener al menos un número' })
    @Matches(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Debe contener al menos un símbolo especial' })
    newPassword: string;
    
    @IsString()
    @IsNotEmpty({message: 'password confirmation is required'})
    @Match('newPassword', { message: 'passwords do not match' })
    passwordConfirm: string;
}