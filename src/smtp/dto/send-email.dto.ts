import { IsNotEmpty } from "class-validator";

export class SendEmailDto {
    @IsNotEmpty({ message: 'Email should not be empty' })
    email: string;
    @IsNotEmpty({ message: 'Token should not be empty' })
    token: string;
}