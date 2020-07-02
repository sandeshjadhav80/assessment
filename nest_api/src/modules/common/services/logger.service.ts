import { Injectable } from '@nestjs/common';
import { throwStatement } from '@babel/types';
import { MailerService } from '@nest-modules/mailer';
import { Logger } from '@nestjs/common';
const { createLogger, format, transports } = require('winston');
import * as moment from 'moment'; 

@Injectable()
export class LoggerService {
    private infoLog;
    private warningLog;
    private errorLog;
    constructor() {
        this.infoLog = createLogger({
            level: 'info',
            format: format.combine(
              format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
              }),
              format.errors({ stack: true }),
              format.splat(),
              format.json()
            ),
            transports: [
              //
              // - Write to all logs with level `info` and below to `quick-start-combined.log`.
              // - Write all logs error (and below) to `quick-start-error.log`.
              //
              new transports.File({ filename: 'logs/info/' + moment().format('YYYY-MM-DD') + '/' + moment().format('HH') + '.log' }),
            ]
        });
        this.errorLog = createLogger({
            level: 'error',
            format: format.combine(
              format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
              }),
              format.errors({ stack: true }),
              format.splat(),
              format.json()
            ),
            transports: [
              //
              // - Write to all logs with level `info` and below to `quick-start-combined.log`.
              // - Write all logs error (and below) to `quick-start-error.log`.
              //
              new transports.File({ filename: 'logs/error/' + moment().format('YYYY-MM-DD') + '/' + moment().format('HH') + '.log' }),
            ]
        });
    }

    /**
     * @summary log information the given string into file system
     *
     * @arg(text): string accepts
     *
     * @returns response :
     */
    async logInfo(test: string) {
        this.infoLog.log({
            level: 'info',
            message: test,
            // additional: 'properties',
            // are: 'passed along'
          });
    }
    /**
     * @summary log errors the given string into file system
     *
     * @arg(text): string accepts
     *
     * @returns response :
     */
    async logError(test: string) {
        this.errorLog.log({
            level: 'error',
            message: test,
            // additional: 'properties',
            // are: 'passed along'
          });
    }
}
