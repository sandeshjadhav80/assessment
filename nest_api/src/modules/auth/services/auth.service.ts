import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HelperService, constant, LangService, LoggerService, MailInterface, MailService } from './../../common/index';
import { UserModel } from '../../user/models/user.model';
import {User} from '../../user/interfaces/user.interface';
import {UserDto} from '../../user/dto/user.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        private readonly userModel: UserModel,
        private readonly jwtService: JwtService,
        private readonly helperService: HelperService,
        private readonly langService: LangService,
        private readonly loggerService: LoggerService,
        private readonly mailService: MailService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        let res = '';
        const saltRounds = 10;
        
        const user = await this.userModel.user.findOne({email: username}).exec();
        if (user === null) {
            res = null;
        } else {
            console.log(user);
            
            const match = await bcrypt.compare(password, user.password);
            console.log(match);
            
            if (match === true) {
                res = user;
            } else {
                res = null;
            }
        }
        if (res !== null) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    /**
     * @summary user login
     *
     * @arg(email): string accepted registered email id
     * @arg(password): string accepted
     *
     * @returns object with user details or null
     */
    async userLogin(user: any) {
        const payload = { username: user._doc.email, sub: user._doc._id };
        const userDetails = user._doc;
        if (userDetails.role === 'Super Admin') {
            return {
                responseCode: 'error',
                responseMessage: 'Super admin can not login through this service',
                data: [],
            };
        } else {
            // todo: call third party web service
            userDetails.access_token = this.jwtService.sign(payload);
            delete userDetails.password;
            return {
                responseCode: 'success',
                responseMessage: 'Login successfully',
                data: userDetails,
            };
        }
    }
    /**
     * @summary super user login
     *
     * @arg(email): string accepted registered email id
     * @arg(password): string accepted
     *
     * @returns object with user details or null
     */
    async superAdminLogin(user: any) {
        const payload = { username: user._doc.email, sub: user._doc._id };
        const userDetails = user._doc;
        delete userDetails.password;
        userDetails.access_token = this.jwtService.sign(payload);
        if (userDetails.role === 'Super Admin') {
            return {
                responseCode: 'success',
                responseMessage: 'Login successfully',
                data: userDetails,
            };
        } else {
            return {
                responseCode: 'error',
                responseMessage: 'Only super admin can login through this service',
                data: [],
            };
        }
    }
    /**
     * @summary check email id valid or not and send reset password link on email id
     *
     * @param(email): string type registered email id
     *
     * @returns object with success or error code
     */
    async sendResetPasswordLink(email: string, headers: any): Promise<User | null> {
        const user = await this.userModel.user.findOne({email}).select('-password').exec();
        if (user !== null) {
            const currentDate = new Date();
            const token = user.email + '#moofwd#' + currentDate.getTime();
            const encryptedTokenPromise = this.helperService.encrypt(token);
            let encryptedToken: string = '';
            encryptedToken  = await encryptedTokenPromise.then(result => result);
            const html = `<p><b>Hello ` + user.name + `,</b></p>
                        <p>You recently requested to reset your password for your <b>Moouniversity Admin Portal</b> account. Use the button below to reset it. This password reset is only valid for next 1 hours.</p>
                        <p style="text-align: center">
                            <a style="color:white; text-decoration: none;"
                                href="` + process.env.APPLICATION_URL + `/auth/reset-password/` + encryptedToken + `">
                                <button style="height:35px; width:120px; background: #2ecc71;color:white;">
                                    Reset Password
                                </button>
                            </a>
                        </p>
                        <p>Thanks,</p>
                        <p>The Moouniversity Team</p>
                        `;
            const mooMail: MailInterface = {
                to: user.email,
                from: 'moofwdindia@gmail.com',
                subject: 'Reset Password',
                html: html,
            };
            // console.log(email);
            // const res: User = await this.userModel.users.findOneAndUpdate(
            //                                             {email: email},
            //                                             // { $addFields : {reset_password_token: 'test123'} }
            //                                             { $set: {reset_password_token: 'test123'}, description: 'test' },
            //                                             { strict: false, new: true }
            //                                         ).exec();
            const res = await this.userModel.user.findOneAndUpdate(
                                                        {email: email},
                                                        // { $addFields : {reset_password_token: '1234'} },
                                                        { reset_password_token: encryptedToken },
                                                        { upsert: true }
                                                    ).exec().then(result => result);
            if ( typeof res.reset_password_token !== undefined) {
                this.mailService.send(mooMail);
                return user;
            } else {
                return null;
            }
            
        } else {
            return null;
        }
    }
    /**
     * @summary check whether token is valid or not
     *
     * @param(token): string type token
     *
     * @returns object with success or error code
     */
    async verifyResetPasswordToken(token: string): Promise<User | null> {
        const decryptedTokenPromise = this.helperService.decrypt(token);
        const decryptedToken: string  = await decryptedTokenPromise.then(result => result);
        this.loggerService.logError('decryptedToken' + decryptedToken);
        const tokenDetail: string[] = decryptedToken.split('#moofwd#');
        if (tokenDetail[1] === undefined) {
            // token is tampared
            this.loggerService.logError('token is tampared');
            return null;
        }
        const tokenTime: number = parseInt(tokenDetail[1]);
        const currentTime = new Date().getTime();
        if ((currentTime - tokenTime > 3600000) === true) {
            this.loggerService.logError('token expired due to time');
            return null;
        } else {
            // token is not expired
            const user = await this.userModel.user.findOne({email: tokenDetail[0], reset_password_token: token}).exec();
            // check
            if (user === null) {
                this.loggerService.logError('user not found in database');
                return null;
            } else {
                return user;
            }
        }
    }
    /**
     * @summary check whether token is valid or not and reset user password
     *
     * @param(token): string type token
     * @param(newPassword): string type new password
     *
     * @returns object with success or error code
     */
    async resetPassword(token: string, password: string): Promise<User | null> {
        const decryptedTokenPromise = this.helperService.decrypt(token);
        const decryptedToken: string  = await decryptedTokenPromise.then(result => result);
        const tokenDetail: string[] = decryptedToken.split('#moofwd#');
        const tokenTime: number = parseInt(tokenDetail[1]);
        const currentTime = new Date().getTime();
        if ((currentTime - tokenTime > 3600000) === true) {
            // expired
            return null;
        } else {
            // token is not expired
            const user = await this.userModel.user.findOne({email: tokenDetail[0], reset_password_token: token}).exec();
            // check user not exist
            if (user === null) {
                return null;
            } else {
                // user exit
                // update password
                const saltRounds = 10;
                password = bcrypt.hashSync(password, saltRounds);
                const res = await this.userModel.user.findByIdAndUpdate(user._id, {password: password}).exec();
                return user;
            }
        }
    }
    async setPasswordLink(user: UserDto): Promise<User | null | boolean> {
            const currentDate = new Date();
            const token = user.email + '#moofwd#' + currentDate.getTime();
            const encryptedTokenPromise = this.helperService.encrypt(token);
            let encryptedToken: string = '';
            encryptedToken  = await encryptedTokenPromise.then(result => result);
            const html = `<p><b>Hello ` + user.name + `,</b></p>
                        <p>Your account is created on <b>Moouniversity Admin Portal</b> account. Use the button below to set password of your account. This link is only valid for next 1 hours.</p>
                        <p style="text-align: center">
                            <a style="color:white; text-decoration: none;"
                                href="` + process.env.APPLICATION_URL + `/auth/reset-password/` + encryptedToken + `">
                                <button style="height:35px; width:120px; background: #2ecc71;color:white;">
                                    Set Password
                                </button>
                            </a>
                        </p>
                        <p>Thanks,</p>
                        <p>The Moouniversity Team</p>
                        `;
            const mooMail: MailInterface = {
                to: user.email,
                from: 'moofwdindia@gmail.com',
                subject: 'Set Password',
                html,
            };
            const res = await this.userModel.user.findOneAndUpdate(
                                                        {email: user.email},
                                                        { reset_password_token: encryptedToken },
                                                        { upsert: true }
                                                    ).exec().then(result => result);
            if ( typeof res.reset_password_token !== undefined) {
                this.mailService.send(mooMail);
                return true;
            } else {
                return null;
            }
    }
}
