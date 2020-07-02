import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { LoggerService } from '../services/logger.service';
import { json } from 'express';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    constructor() {}

    /**
     * @summary catch runtime exception, return proper response and log errors
     *
     * @arg(text): exception
     * @arg(ArgumentsHost): exception
     *
     * @returns return valid response object in case of exception occured
     */
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest<Request>();
        const status =
        exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        
        // todo: log error tress and request
        const message = 'url: ' + request.url + ', method: ' + request.method + ', exception: ' + exception;
        const loggerService: LoggerService = new LoggerService();
        loggerService.logError(message);
        response.status(status).json({
                                    responseCode: 'error',
                                    statusCode: status,
                                    timestamp: new Date().toISOString(),
                                    responseMesssage: 'Something went wrong',
                                });
    }
}