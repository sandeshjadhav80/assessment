import { Controller, Get, Query, Post, Body, Put, Req, Request,
    Param, Delete, UsePipes, UseInterceptors, 
    UseGuards, HttpCode, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { LinksService } from '../services/links.service';
import {VisiterDetailsService} from './../../visiter-details/services/visiter-details.service';
import {VisiterDetailsDto} from '../../visiter-details/dto/visiter-details.dto';
import { HelperService, constant } from './../../common/index';
import { LoggingInterceptor, TrimPipe, ValidationPipe, LangService, ResponseInterface } from './../../common/index';
const stringHash = require("string-hash");
const moment = require('moment');

@Controller('')
@UsePipes(TrimPipe)
@UseInterceptors(LoggingInterceptor)
export class RedirectToLinkController {
	response: ResponseInterface;
	constructor(
		private readonly linksService: LinksService,
		private readonly helperService: HelperService,
		private readonly langService: LangService,
		private readonly visiterDetailsService: VisiterDetailsService
		) {}
	/**
	 * @summary get the url from url hash and then redirect use to url otherwise show error
	 *
	 * @param(url_hash): string accepted
	 * @param(LinksDto): institution object in body accepted
     * 	 
	 * @returns redirect to url or return error message
	 */
	@Get(':url_hash')
	async findOne(@Param('url_hash') urlHash: string, @Res() res: Response, @Req() req: Request): Promise<any>  {
        const result = await this.linksService.findByHash(urlHash);
        console.log(result, 'sandesh', req);
        console.dir(req.referrer);
        const visiterDetails:VisiterDetailsDto = {
            user_agent: req.headers['user-agent'],
            http_headers: JSON.stringify(req.headers),
            time: moment().format(),
            ip: req.headers['host'],
            referer: '',
        };
        this.visiterDetailsService.create(visiterDetails);
        if (result.length === 0) {
            this.response = this.helperService.getResponse(constant.action.OTHER, null, null, 'error', 'invalid hash');
		    res.status(HttpStatus.OK).json(this.response);
        } else {
            console.log(result[0].url);
            res.redirect(result[0].url);
        }
	}
	
}
