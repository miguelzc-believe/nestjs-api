import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import nodemailer from 'nodemailer';


@Injectable()
export class SmtpService {
    async  sendEmail(sendEmailDto:SendEmailDto) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        })
        const info = await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: sendEmailDto.email,
            subject: 'CODIGO DE AUTENTICACION',
            text: sendEmailDto.token,
        })
        return "Email enviado satisfactoriamente "+ info.messageId;
    }
}
