import { Controller, Get, Query, Post, Body, Put, Req, Request,
    Param, Delete, UsePipes, UseInterceptors, 
    UseGuards, HttpCode, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { VisiterDetailsDto } from '../dto/visiter-details.dto';
import { VisiterDetailsService } from '../services/visiter-details.service';
import { VisiterDetails } from '../interfaces/visiter-details.interface';
import { HelperService, constant } from './../../common/index';

import { LoggingInterceptor, TrimPipe, ValidationPipe, LangService, ResponseInterface } from './../../common/index';

@Controller('visiter-details')
@UsePipes(TrimPipe)
@UseInterceptors(LoggingInterceptor)
export class VisiterDetailsController {
	response: ResponseInterface;
	constructor(
		private readonly visiterDetailsService: VisiterDetailsService,
		private readonly helperService: HelperService,
		private readonly langService: LangService,
		
		) {}
	/**
	 * @summary get all VisiterDetails list
	 *
	 * @param(page_number): number accepted
	 * @param(page_size): number accepted
	 * @param(sort_by): string accepted
	 * @param(sort_direction): number 1 or -1 accepted
	 * @param(filter): string accepted
	 *
	 * @returns get list of VisiterDetails
	 */
	@Get()
	async findAll(
		@Query('page_number') pageNumber: string,
		@Query('page_size') pageSize: string,
		@Query('sort_by') sortBy: string,
		@Query('sort_direction') sortDirection: string,
		@Query('filter') filter: string,
		@Res() res: Response): Promise<any> {
		const result = await this.visiterDetailsService.findAll(parseInt(pageNumber), parseInt(pageSize), sortBy, sortDirection, filter);
		const totalRecords = await this.visiterDetailsService.getTotalRecords(filter);
		this.response = this.helperService.getResponse(constant.action.LIST, result, { visiterDetailsList: result, total_records: totalRecords });
		res.status(HttpStatus.OK).json(this.response);
	}
	
}
