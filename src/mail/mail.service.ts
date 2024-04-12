import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: this.configService.get<string>('MAILER'),
        pass: this.configService.get<string>('SENHA_EMAIL'),
      },
    });
  }

  async sendMail(name: string, email: string, message: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('MAILER'),
      to: 'gabriel@amorim.pro',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
