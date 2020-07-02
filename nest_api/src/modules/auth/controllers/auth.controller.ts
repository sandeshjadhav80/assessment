import { Controller, Request, Post, Get, UseGuards, HttpStatus, Res, Body, Param, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { HelperService, constant, ResponseInterface, LangService, LoggerService } from './../../common/index';

@Controller()
export class AuthController {
    response: ResponseInterface;
    constructor(
        private readonly authService: AuthService,
        private readonly langService: LangService,
        private readonly helperService: HelperService,
        private readonly loggerService: LoggerService,
    ) {}

    /**
     * @summary user should able to login with valid credentials
     *
     * @param(username): string accepted registered email id
     * @param(password): string accepted password
     *
     * @returns object with user details and JWT token
     */
    @UseGuards(AuthGuard('local'))  // this is one of the passport strategy and now we do have local passport strategy
    @Post('auth/user/login')
    async login(@Request() req) {
        return this.authService.userLogin(req.user);
    }

    /**
     * @summary super admin should able to login with valid credentials
     *
     * @param(username): string accepted registered email id
     * @param(password): string accepted password
     *
     * @returns object with user details and JWT token
     */
    @UseGuards(AuthGuard('local'))  // this is one of the passport strategy and now we do have local passport strategy
    @Post('auth/super-admin/login')
    async superAdminLogin(@Request() req) {
        console.log('welcome login here');
        return this.authService.superAdminLogin(req.user);
    }

    /**
     * @summary check email id valid or not and send reset password link on email id
     *
     * @param(email): string type registered email id
     *
     * @returns object with success or error code
     */
    @HttpCode(200)
    @Post('forgot-password')
    async forgotPassword(@Request() req: Request, @Body() body: any, @Res() res: Response): Promise<any> {
        const user = await this.authService.sendResetPasswordLink(body.email, req.headers).then(result => result);
        let response = {};
        if (user !== null) {
            response = {
                responseCode: this.langService.get('en', constant.SUCCESS),
                responseMessage: this.langService.get('en', 'user.resetPassLinkSent'),
                data: user,
            };
        } else {
            response = {
                responseCode: this.langService.get('en', constant.ERROR),
                responseMessage: this.langService.get('en', 'user.emailNotExist'),
            };
        }
        res.status(HttpStatus.OK).json(response);
    }
    /**
     * @summary check whether token is valid or not
     *
     * @param(token): string type token
     *
     * @returns object with success or error code
     */
    @HttpCode(200)
    @Post('verify-reset-password-token/:token')
    async verifyResetPasswordToken(@Param('token') token: string, @Body() req: any, @Res() res: Response): Promise<any> {
        this.loggerService.logError('request is received');
        const result = await this.authService.verifyResetPasswordToken(token);
        let response = {};
        if (result !== null) {
            response = {
                responseCode: this.langService.get('en', constant.SUCCESS),
                responseMessage: this.langService.get('en', 'user.validToken'),
            };
        } else {
            response = {
                responseCode: this.langService.get('en', constant.ERROR),
                responseMessage: this.langService.get('en', 'user.invalidToken'),
            };
        }
        res.status(HttpStatus.OK).json(response);
    }
    /**
     * @summary check whether token is valid or not and reset user password
     *
     * @param(token): string type token
     * @param(password): string type new password
     *
     * @returns object with success or error code
     */
    @HttpCode(200)
    @Post('reset-password/:token')
    async resetPassword(@Param('token') token: string, @Body() req: any, @Res() res: Response): Promise<any> {
        const result = await this.authService.resetPassword(token, req.password);
        let response = {};
        if (result !== null) {
            response = {
                responseCode: this.langService.get('en', constant.SUCCESS),
                responseMessage: this.langService.get('en', 'user.passwordUpdateSuccess'),
            };
        } else {
            response = {
                responseCode: this.langService.get('en', constant.ERROR),
                responseMessage: this.langService.get('en', 'user.passwordUpdateFailed'),
            };
        }
        res.status(HttpStatus.OK).json(response);
    }
}