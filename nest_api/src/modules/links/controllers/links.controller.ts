import { Controller, Get, Query, Post, Body, Put, Req, Request,
    Param, Delete, UsePipes, UseInterceptors, 
    UseGuards, HttpCode, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LinksDto } from '../dto/links.dto';
import { LinksService } from '../services/links.service';
import { Links } from '../interfaces/links.interface';
import { HelperService, constant } from './../../common/index';
import { LoggingInterceptor, TrimPipe, ValidationPipe, LangService, ResponseInterface } from './../../common/index';
const stringHash = require("string-hash");


@Controller('links')
@UsePipes(TrimPipe)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard('jwt'))
export class LinksController {
	response: ResponseInterface;
	constructor(
		private readonly linksService: LinksService,
		private readonly helperService: HelperService,
		private readonly langService: LangService,
		
		) {}
	/**
	 * @summary create Links entity
	 *
	 * @param(linksDto): linksDto accepted
	 *
	 * @returns success or error code
	 */
	// @UsePipes(new ValidationPipe())
	@UsePipes(ValidationPipe)
	// @UseGuards(AuthGuard('jwt'))
	@HttpCode(201)
	@Post()
	async create(@Request() req: any, @Body() linksDto: LinksDto, @Res() res: Response): Promise<any> {

		// get last sequence number
		const links: Links[] = await this.linksService.getLastHashSequenceNumber();
		console.log(links);
		let url_hash:number = 1000;
		if (links.length !== 0) {
			url_hash = links[0].url_hash + 1;
		}
		
		linksDto.url_hash = url_hash;
		linksDto.short_url = 'http://' + req.user.white_label_host + '/' + linksDto.url_hash;

		const result = await this.linksService.create(linksDto);
		this.response = this.helperService.getResponse(constant.action.CREATE, result, {links: result});
		res.status(HttpStatus.CREATED).json(this.response);
	}

	/**
	 * @summary get all Links list
	 *
	 * @param(page_number): number accepted
	 * @param(page_size): number accepted
	 * @param(sort_by): string accepted
	 * @param(sort_direction): number 1 or -1 accepted
	 * @param(filter): string accepted
	 *
	 * @returns get list of Links
	 */
	@Get()
	async findAll(
		@Query('page_number') pageNumber: string,
		@Query('page_size') pageSize: string,
		@Query('sort_by') sortBy: string,
		@Query('sort_direction') sortDirection: string,
		@Query('filter') filter: string,
		@Res() res: Response): Promise<any> {
		const result = await this.linksService.findAll(parseInt(pageNumber), parseInt(pageSize), sortBy, sortDirection, filter);
		const totalRecords = await this.linksService.getTotalRecords(filter);
		this.response = this.helperService.getResponse(constant.action.LIST, result, { linksList: result, total_records: totalRecords });
		res.status(HttpStatus.OK).json(this.response);
	}
}
