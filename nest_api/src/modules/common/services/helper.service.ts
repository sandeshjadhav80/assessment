import { Injectable, Req, Res  } from '@nestjs/common';
import { throwStatement } from '@babel/types';
const Cryptr = require('cryptr');
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { ResponseInterface } from '../interfaces/response.interface';
import { LoggerService } from './logger.service';
import { LangService } from './lang.service';
import { constant } from '../constants/constants';
// const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
// const AWS_S3_BUCKET_NAME = constant.AWS_S3_BUCKET_NAME;
// const s3 = new AWS.S3();
// AWS.config.update({
//   accessKeyId: constant.AWS_ACCESS_KEY_ID,
//   secretAccessKey: constant.AWS_SECRET_ACCESS_KEY,
// });


@Injectable()
export class HelperService {
    private privateKey: string = 'MLKHO@$$!!';
    private response: ResponseInterface;
    constructor(
        private readonly langService: LangService,
        private readonly loggerService: LoggerService,
        ) {}

    /**
     * @summary encrypt the given string
     *
     * @arg(text): string accepts
     *
     * @returns response : Promise<string>
     */
    async encrypt(text: string): Promise<string> {
        const cryptr = new Cryptr(this.privateKey);
        return await cryptr.encrypt(text);
    }
    /**
     * @summary decrypt the given string
     *
     * @arg(text): string accepts
     *
     * @returns response : Promise<string>
     */
    async decrypt(cipher: string): Promise<string> {
        const cryptr = new Cryptr(this.privateKey);
        return await cryptr.decrypt(cipher);
    }
    /**
     * @summary get response object
     *
     * @arg(type): string type of request
     * @arg(res): string type of nay resulted value
     * @arg(data): array type of data
     * @arg(responseCode): string type eighter error or success
     * @arg(responseMessage): string type
     *
     * @returns response : Promise<string>
     */
    getResponse(type: string, res: any, data: any = {}, responseCode: string = '', responseMessage: string = ''): ResponseInterface {
        switch (type) {
            case constant.action.CREATE:
                if (res !== null) {
                    this.response = {
                        responseCode: constant.SUCCESS,
                        responseMessage: 'Data created successfully',
                        data: data,
                    };
                } else {
                    this.response = {
                        responseCode: constant.ERROR,
                        responseMessage: 'Something went wrong, failed to create resource',
                        data: {},
                    };
                }
                break;
            case constant.action.UPDATE:
                if (res !== false) {
                    this.response = {
                        responseCode: constant.SUCCESS,
                        responseMessage: 'Data updated successfully',
                        data: data,
                    };
                } else {
                    this.response = {
                        responseCode: constant.ERROR,
                        responseMessage: 'Something went wrong, failed to update resource',
                        data: {},
                    };
                }
                break;
            case constant.action.DELETE:
                if (res !== null) {
                    this.response = {
                        responseCode: constant.SUCCESS,
                        responseMessage: 'Data deleted successfully',
                        data: {},
                    };
                } else {
                    this.response = {
                        responseCode: constant.ERROR,
                        responseMessage: 'Something went wrong, failed to delete resource',
                        data: {},
                    };
                }
                break;
            case constant.action.LIST:
                this.response = {
                    responseCode: constant.SUCCESS,
                    responseMessage: 'Data fetch successfully',
                    data: data,
                };
                break;
            case constant.action.DETAIL:
                if (res !== null) {
                    this.response = {
                        responseCode: constant.SUCCESS,
                        responseMessage: 'Details fetch successfully',
                        data: data,
                    };
                } else {
                    this.response = {
                        responseCode: constant.ERROR,
                        responseMessage: data.id + ' ' + data.entityName +  ' does not exist',
                        data: {},
                    };
                }
                break;
            default:
                this.response = { responseCode, responseMessage, data };
        }
        return this.response;
    }
}
