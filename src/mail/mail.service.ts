import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/models/user.model';

@Injectable()
export class MailService {
    constructor(private mailerServie: MailerService){}

    async sendUserConfirmation(user: User): Promise<void> {
        const url = `${process.env.API_HOST}/api/auth/activate/${user.activation_link}`;
        await this.mailerServie.sendMail({
            to: user.email,
            subject: "Welcome to Stadium App! Confirm your Email!",
            template: "./confirmation",
            context: {
                name: user.first_name,
                url
            }
        })
    }
}
