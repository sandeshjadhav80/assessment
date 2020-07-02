import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { VisiterDetailsService } from './services/visiter-details.service';
import { VisiterDetailsSchema } from './schemas/visiter-details.schema';
import { VisiterDetailsController } from './controllers/visiter-details.controller';
import { VisiterDetailsModel } from './models/visiter-details.model';

import { HelperService, MailService, LangService, LoggerService } from './../common/index';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forFeature(
        [
            { name: 'VisiterDetailss', schema: VisiterDetailsSchema },
        ],
    )],
    controllers: [ 
        VisiterDetailsController, 
       
    ],
    providers: [ 
        VisiterDetailsService, 
        VisiterDetailsModel, 
        LoggerService, 
        HelperService, 
        MailService, 
        LangService,
   
    ],
    exports: [ 
        VisiterDetailsService, 
        VisiterDetailsModel
    ],
})
export class VisiterDetailsModule {}
