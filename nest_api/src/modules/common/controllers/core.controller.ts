import { Controller, Get, Query, Post, Body, HttpStatus, Put, Param, Delete, Req, Res, Request, UsePipes, UseInterceptors, UseGuards } from '@nestjs/common';
import { MailService } from '../services/mail.service';
import { MailInterface } from '../interfaces/mail.interface';
import { HelperService } from '../services/helper.service';
import { LoggerService } from '../services/logger.service';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { LangService } from '../services/lang.service';
import { Response } from 'express';
import { HTTPService } from '../services/http.service';
import { ResponseInterface } from '../interfaces/response.interface';
import { constant } from '../constants/constants';

@Controller('core')
@UseInterceptors(LoggingInterceptor)
export class CoreController {
    constructor(
        private readonly mailService: MailService,
        private readonly helperService: HelperService,
        private readonly loggerService: LoggerService,
        private readonly langService: LangService,
        private readonly httpService: HTTPService,
        ) {}

    @Post('-mailer/send')
    create(@Body() body: any) {
        // console.log('user object in request');
        // const Mail: Mail = {
        //     to: 'sandeshj@fwd.com',
        //     from: 'fwdindia@gmail.com',
        //     subject: 'Testing Nest MailerModule ✔',
        //     html: '<b>welcome3</b>',
        // }
        this.mailService.send(body);
        console.log(body);
        //this.userService.create(userDto);
        // this.catsService.create(createCatDto1);
    }
    @Post('helper/encrypt')
    testHelper(@Body() body: any, @Res() res: Response) {
        // console.log('user object in request');
        // const Mail: Mail = {
        //     to: 'sandeshj@fwd.com',
        //     from: 'fwdindia@gmail.com',
        //     subject: 'Testing Nest MailerModule ✔',
        //     html: '<b>welcome3</b>',
        // }
        // this.LoggerService.logError('error');
        // this.LoggerService.logInfo('info');
        // console.log(this.LangService.get('en', 'category.HELLO_MESSAGE', {id: 1, username: 'Toon'}));
        // console.log(this.LangService.get('en', 'login_instruction.saml.instructions'));
        // const t = this.HelperService.encrypt('HelperService');
        const response = this.httpService.get();
        // response.subscribe(data => console.log(data.status));
        // console.log('after');
        console.log(this.helperService.getResponse(constant.action.OTHER, {}, {test:'test'}, 'success', 'success messsage'));
        res.status(HttpStatus.OK).json([]);
        // this.userService.create(userDto);
        // this.catsService.create(createCatDto1);
    }
    // @Post('helper/upload-file')
    // async uploadFile(@Req() request, @Res() response) {
    //     console.log('request received1')
    //     try {
    //         await this.HelperService.fileupload(request, response);
    //     } catch (error) {
    //     return response
    //         .status(500)
    //         .json(`Failed to upload image file: ${error.message}`);
    //     }
    // }

}
