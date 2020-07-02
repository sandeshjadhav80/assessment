import { Injectable } from '@nestjs/common';
import { throwStatement } from '@babel/types';
import { MailerService } from '@nest-modules/mailer';
import { MailInterface } from '../interfaces/mail.interface';
import { LoggerService } from './logger.service';
@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly loggerService: LoggerService,
        ) {}

    /**
     * @summary send mail on email id
     *
     * @arg(to): string accept email id where mail need to send
     * @arg(from): string accept from email id
     * @arg(subject): string accept subject line
     * @arg(html): string accept html
     *
     * @returns response :
     */
    async send(mooMail: MailInterface) {
        this.mailerService
            .sendMail({
                to: mooMail.to, // sender address
                from: mooMail.from, // list of receivers
                subject: mooMail.subject, // Subject line
                text: '', // plaintext body
                html: mooMail.html, // HTML body content
            })
            .then(() => {
                this.loggerService.logInfo('Mail => to: ' + mooMail.to + ', subject: ' + mooMail.subject);
                console.log('mail sent successfully');
            })
            .catch((error) => {
                this.loggerService.logError('Mail Error Details => to: ' + mooMail.to + ', subject: ' + mooMail.subject + ', Error message: ' + error);
            });
    }
}
