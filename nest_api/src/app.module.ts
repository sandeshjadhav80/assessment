import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { ConfigModule } from '@nestjs/config';

// custom module
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/common/core.module';
import { UserModule } from './modules/user/user.module';
import { LinksModule } from './modules/links/links.module';
import { VisiterDetailsModule } from './modules/visiter-details/visiter-details.module';


@Module({
  imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot('mongodb://' + process.env.HOST + ':27017/' + process.env.DATABASE_NAME),
        MailerModule.forRoot({
            transport: 'smtps://' +  process.env.EMAIL + ':' +  process.env.PASSWORD + process.env.SMTP_HOST,
            defaults: {
            from: '"nest-modules" <modules@nestjs.com>',
            },
            template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(), // or new PugAdapter()
                options: {
                    strict: true,
                },
            },
        }),
        CoreModule,
        AuthModule,
		    UserModule,
        LinksModule,
        VisiterDetailsModule,
      
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
