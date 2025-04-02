import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { transporter } from './config/config.smtp';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class SmtpService {
  constructor(private readonly dbClient: PrismaService) {}
  
    async  sendEmail(sendEmailDto:SendEmailDto) {
        
        const info = await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: sendEmailDto.email,
            subject: 'CODIGO DE AUTENTICACION',
            text: sendEmailDto.token,
        })
        return "Email enviado satisfactoriamente "+ info.messageId;
    }
}
