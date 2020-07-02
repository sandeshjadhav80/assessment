import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        private readonly mooLoggerService: LoggerService,
        ) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const requestNumber = Date.now();
        const message = 'Request Detail => request number: ' +  requestNumber +
                        ', end point: ' +  request.url +
                        ', method: ' + request.method +
                        ', header: ' + JSON.stringify(request.headers) +
                        ', body: ' + JSON.stringify(request.body);
        this.mooLoggerService.logInfo(message);
        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => {
                    this.mooLoggerService.logInfo(
                        `Response Detail => request number: ` + requestNumber + 
                        `, end point: ` + request.url +
                        `, method: ` + request.method +
                        `, status code: ` + response.statusCode +
                        `, Execution Time: ${Date.now() - now}ms`);
                }),
                // map(data => ({ data })),
            );
    }
}