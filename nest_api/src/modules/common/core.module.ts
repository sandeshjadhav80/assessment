import { Module, HttpModule } from '@nestjs/common';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { constant } from './constants/constants';
import { CoreController } from './controllers/core.controller';
import { MailService } from './services/mail.service';
import { HelperService } from './services/helper.service';
import { LoggerService } from './services/logger.service';
import { HTTPService } from './services/http.service';
import { LangService } from './services/lang.service';

import * as path from 'path';
import { I18nModule } from 'nestjs-i18n';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: 'smtps://' + constant.EMAIL + ':' + constant.PASSWORD + constant.HOST,
            defaults: {
              from:'"nest-modules" <modules@nestjs.com>',
            },
            template: {
              dir: __dirname + '/templates',
              adapter: new HandlebarsAdapter(), // or new PugAdapter()
              options: {
                strict: true,
              },
            },
        }),

        I18nModule.forRoot({
            path: path.join(__dirname, '/i18n'),
            filePattern: '*.json',
            fallbackLanguage: 'en',
        }),
        HttpModule,
    ],
    controllers: [ CoreController ],
    providers: [ MailService, HelperService, LoggerService, HTTPService, LangService ],
    exports: [ MailService, HelperService, LoggerService, HTTPService, LangService ],
})
export class CoreModule {}
