import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LinksService } from './services/links.service';
import { LinksSchema } from './schemas/links.schema';
import { LinksController } from './controllers/links.controller';
import { RedirectToLinkController } from './controllers/redirect-to-link.controller';
import { LinksModel } from './models/links.model';
import { VisiterDetailsService } from './../visiter-details/services/visiter-details.service';
import {VisiterDetailsModule} from './../visiter-details/visiter-details.module';
import { HelperService, MailService, LangService, LoggerService } from './../common/index';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forFeature(
            [
                { name: 'Linkss', schema: LinksSchema },
            ],
        ),
        VisiterDetailsModule,
    ],
    controllers: [ 
        LinksController, 
        RedirectToLinkController,
    ],
    providers: [ 
        LinksService, 
        LinksModel, 
        LoggerService, 
        HelperService, 
        MailService, 
        LangService,
        VisiterDetailsService,
     
    ],
    exports: [ 
        LinksService, 
        LinksModel,
    ],
})
export class LinksModule {}
