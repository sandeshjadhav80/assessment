import { Injectable, HttpService } from '@nestjs/common';
import { throwStatement } from '@babel/types';
import { MailerService } from '@nest-modules/mailer';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { LoggerService } from './logger.service';
@Injectable()
export class HTTPService {
    constructor(
        private readonly httpService: HttpService,
        private readonly loggerService: LoggerService,
        ) {}

    get(): Observable<AxiosResponse<any[]>> {
        const response = this.httpService.get('http://localhost:3000/users');
        // response.subscribe(data => {
        //     console.log('test');
        //     console.log(data.status);
        // });
        //console.log(response);
        return response;
    }
}
