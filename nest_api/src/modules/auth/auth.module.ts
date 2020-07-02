import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
// read more passport by its offical website: http://www.passportjs.org/docs/oauth/
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';

// local to live package
import { UserModule } from './../user/user.module';
import { UserService } from './../user/services/user.service';
import { LangService, HelperService, MailService, LoggerService } from './../common/index';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        // this example of dynamic module, a jwt module which take some dynamic argument and return module which is them import by this module
        // more on configuration options: https://github.com/auth0/node-jsonwebtoken#usage
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME }, // jwt token expirection time kept as 1 hour
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy,
                JwtStrategy, UserService, LangService, HelperService, 
                MailService, LoggerService],
    exports: [AuthService],
})
export class AuthModule {
    // public static forRoot(environment){
    // }
}
