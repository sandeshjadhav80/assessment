import { Injectable, Inject } from '@nestjs/common';
import { VisiterDetails } from '../interfaces/visiter-details.interface';
import { VisiterDetailsDto } from '../dto/visiter-details.dto';
import { VisiterDetailsModel } from '../models/visiter-details.model';
import { MailService, HelperService, MailInterface } from '../../common/index';

const bcrypt = require('bcrypt');

@Injectable()
export class VisiterDetailsService {
    
    constructor(
        private readonly visiterDetailsModel: VisiterDetailsModel,
        private readonly mailService: MailService,
        private readonly helperService: HelperService,
    ) {}
       
    /**
     * @summary create new VisiterDetails
     *
     * @param(visiterDetailsDto): object type with VisiterDetails details
     *
     * @returns object with Promise<VisiterDetails>
     */
    async create(visiterDetailsDto: VisiterDetailsDto): Promise<VisiterDetails | null> {
        const res = this.visiterDetailsModel.visiterDetails.create(visiterDetailsDto);
        const result = await res.then((data) => {
            return data;
        });
        return result;
    }
    /**
     * @summary get all VisiterDetails list
     *
     * @param(pageNumber): number accepted
     * @param(pageSize): number accepted
     * @param(sortBy): string accepted
     * @param(sortDirection): number 1 or -1 accepted
     * @param(filter): string accepted
     *
     * @returns get list of VisiterDetails
     */
    async findAll(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, filter: string): Promise<VisiterDetails[]> {
        const sorting = {};
        if (typeof sortBy === 'undefined' || typeof sortDirection === 'undefined') {
            sorting['_id'] = -1;
        } else {
            sorting[sortBy] = parseInt(sortDirection);
        }
        pageNumber = (pageNumber < 0) ? 0 : pageNumber;
        const res = this.visiterDetailsModel.visiterDetails.find()
                    .skip((pageNumber) * pageSize)
                    .limit(pageSize)
                    .sort(sorting);
        const result = await res.then((data) => {
            return data;
        });
        return result;
    }
    /**
     * @summary get total records of table
     *
     * @param(id): number accepted
     *
     * @returns detail or empty
     */
    async getTotalRecords(filter: string): Promise<Number> {
        const res = this.visiterDetailsModel.visiterDetails.find().count();
        const result = await res.then((data) => {
            return data;
        });
        return result;
    }
}
