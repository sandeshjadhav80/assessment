import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './services/user.service';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './controllers/user.controller';
import { UserModel } from './models/user.model';
//subDocumentImports
import { HelperService, MailService, LangService, LoggerService } from './../common/index';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forFeature(
        [
            { name: 'Users', schema: UserSchema },
        ],
    )],
    controllers: [ 
        UserController, 
        //subDocumentController
    ],
    providers: [ 
        UserService, 
        UserModel, 
        LoggerService, 
        HelperService, 
        MailService, 
        LangService,
        //subDocumentService
    ],
    exports: [ 
        UserService, 
        UserModel
    ],
})
export class UserModule {}
