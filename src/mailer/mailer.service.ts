import { Injectable } from '@nestjs/common';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';
import * as nodemailer from 'nodemailer'
@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  constructor(){
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth : {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    })
  }

  async sendActivationEmail(link : string , email : string): Promise<void> {
    const mailOptions = {
        from: process.env.EMAIL_FROM, // sender address
        to: email, // list of receivers
        subject: 'Activate your account', // Subject line
        html: `<p>Please click <a href="${process.env.BASE_URL}/${link}">here</a> to activate your account.</p>`
    };

    const data = this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return 'Error sending email:'
        } else {
            return 'Activation email sent:'
        }
    });

    console.log(data)
}

}
