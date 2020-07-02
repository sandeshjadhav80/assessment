import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants/constants';
// import { UsersService } from '../users/services/users.service';
import { UserService } from './../../user/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    /**
     * @summary register jwt strategy configuration
     *
     * @returns
     */
    constructor(private readonly userService: UserService) {
        // for more configuration options: https://github.com/mikenicholson/passport-jwt#configure-strategy
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // generaly we read jwt token from header, but we can read from other place as well
            // for more detail: https://github.com/mikenicholson/passport-jwt#extracting-the-jwt-from-the-request

            ignoreExpiration: false,
            // we are keeping screate key here but we can use another approach(generating pem file) as well
            // for more detail: https://github.com/mikenicholson/passport-jwt#extracting-the-jwt-from-the-request
            secretOrKey: jwtConstants.secret,
        });
    }
    /**
     * @summary validatating token and user
     *
     * @arg(payload): any type payload which is send in request
     *
     * @returns response : trimed payload
     */
    async validate(payload: any) {
        return this.userService.findOne(payload.sub);
    }
}