import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendRegEmail(name: string, email: string, pin: number): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      from: 'myapp support',
      subject: 'Welcome to myapp! Confirm your Email',
      template: './reg.template.ejs',
      context: {
        name,
        pin,
      },
    });
  }

  async sendResetEmail(email: string, pin: number): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      from: 'myapp support',
      subject: 'Hey From myapp! Confirm your Email to reset Password',
      template: './reset.template.ejs',
      context: {
        pin,
      },
    });
  }
}
