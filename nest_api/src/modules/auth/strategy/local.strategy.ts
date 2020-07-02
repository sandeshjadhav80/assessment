import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }
    /**
     * @summary validatating user by its username and password
     *
     * @arg(username): string accepted register email id
     * @arg(password): string accepted password
     *
     * @returns object type user with details or unauthised exception
     */
    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}