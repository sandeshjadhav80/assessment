import { Controller, Get, Query, Post, Body, Put, Req, Request,
    Param, Delete, UsePipes, UseInterceptors, 
    UseGuards, HttpCode, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { HelperService, constant } from './../../common/index';

import { LoggingInterceptor, TrimPipe, ValidationPipe, LangService, ResponseInterface } from './../../common/index';

@Controller('user')
@UsePipes(TrimPipe)
@UseInterceptors(LoggingInterceptor)
export class UserController {
	response: ResponseInterface;
	constructor(
		private readonly userService: UserService,
		private readonly helperService: HelperService,
		private readonly langService: LangService,
		
		) {}
	/**
	 * @summary create User entity
	 *
	 * @param(object): User type
	 *
	 * @returns object with success or error code
	 */
	// @UsePipes(new ValidationPipe())
	@UsePipes(ValidationPipe)
	// @UseGuards(AuthGuard('jwt'))
	@HttpCode(201)
	@Post()
	async create(@Request() req: any, @Body() userDto: UserDto, @Res() res: Response): Promise<any> {
		const result = await this.userService.create(userDto);
		this.response = this.helperService.getResponse(constant.action.CREATE, result, {user: result});
		res.status(HttpStatus.CREATED).json(this.response);
	}

	/**
	 * @summary get all User list
	 *
	 * @param(page_number): number accepted
	 * @param(page_size): number accepted
	 * @param(sort_by): string accepted
	 * @param(sort_direction): number 1 or -1 accepted
	 * @param(filter): string accepted
	 *
	 * @returns get list of User
	 */
	@Get()
	async findAll(
		@Query('page_number') pageNumber: string,
		@Query('page_size') pageSize: string,
		@Query('sort_by') sortBy: string,
		@Query('sort_direction') sortDirection: string,
		@Query('filter') filter: string,
		@Res() res: Response): Promise<any> {
		const result = await this.userService.findAll(parseInt(pageNumber), parseInt(pageSize), sortBy, sortDirection, filter);
		const totalRecords = await this.userService.getTotalRecords(filter);
		this.response = this.helperService.getResponse(constant.action.LIST, result, { userList: result, total_records: totalRecords });
		res.status(HttpStatus.OK).json(this.response);
	}
	/**
	 * @summary get detail of User
	 *
	 * @param(userId): number accepted
	 *
	 * @returns detail or empty
	 */
	// @UseGuards(AuthGuard('jwt'))
	@Get(':userId')
	async findOne(@Param('userId') userId: string, @Res() res: Response): Promise<any>  {
		const result = await this.userService.findOne(userId);
		this.response = this.helperService.getResponse(constant.action.DETAIL, result, { user: result });
		res.status(HttpStatus.OK).json(this.response);
	}
	/**
	 * @summary update User detail
	 *
	 * @param(userId): number accepted
	 * @param(UserDto): institution object in body accepted
	 *
	 * @returns success or fail
	 */
	@Put(':userId')
	async update(@Param('userId') userId: string, @Body() userDto: UserDto, @Res() res: Response): Promise<any> {
		const result = await this.userService.update(userId, userDto);
		this.response = this.helperService.getResponse(constant.action.UPDATE, result, { user: result });
		res.status(HttpStatus.OK).json(this.response);
	}

	/**
	 * @summary delete User
	 *
	 * @param(id): number accepted
	 *
	 * @returns success or fail
	 */
	@Delete(':userId')
	async remove(@Param('userId') userId: string, @Res() res: Response): Promise<any> {
		const result = await this.userService.remove(userId);
		this.response = this.helperService.getResponse(constant.action.DELETE, result);
		res.status(HttpStatus.OK).json(this.response);
	}
}
