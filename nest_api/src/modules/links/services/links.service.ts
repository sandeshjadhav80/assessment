import { Injectable, Inject } from '@nestjs/common';
import { Links } from '../interfaces/links.interface';
import { LinksDto } from '../dto/links.dto';
import { LinksModel } from '../models/links.model';
import { MailService, HelperService, MailInterface } from '../../common/index';
import { url } from 'inspector';

const bcrypt = require('bcrypt');

@Injectable()
export class LinksService {
    
    constructor(
        private readonly linksModel: LinksModel,
        private readonly helperService: HelperService,
    ) {}
       
    /**
     * @summary create new Links
     *
     * @param(linksDto): object type with Links details
     *
     * @returns object with Promise<Links>
     */
    async create(linksDto: LinksDto): Promise<Links | null> {
        const res = this.linksModel.links.create(linksDto);
        const result = await res.then((data) => {
            return data;
        });
        return result;
    }
    /**
     * @summary get all Links list
     *
     * @param(pageNumber): number accepted
     * @param(pageSize): number accepted
     * @param(sortBy): string accepted
     * @param(sortDirection): number 1 or -1 accepted
     * @param(filter): string accepted
     *
     * @returns get list of Links
     */
    async findAll(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, filter: string): Promise<Links[]> {
        const sorting = {};
        if (typeof sortBy === 'undefined' || typeof sortDirection === 'undefined') {
            sorting['_id'] = -1;
        } else {
            sorting[sortBy] = parseInt(sortDirection);
        }
        pageNumber = (pageNumber < 0) ? 0 : pageNumber;
        const res = this.linksModel.links.find()
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
        const res = this.linksModel.links.find().count();
        const result = await res.then((data) => {
            return data;
        });
        return result;
    }
    
    /**
     * @summary find the url by its hash id
     *
     * @param(linksId): number accepted
     *
     * @returns success or fail
     */
    async findByHash(urlHash: string): Promise<Links[]> {
        let result = null;
        const res = this.linksModel.links.find({url_hash: urlHash}).exec();
        result = await res.then((data) => {
            return data;
        });
        
        return result;
    }
    /**
     * @summary get last hash sequence number
     *
     * @param(pageNumber): number accepted
     * @param(pageSize): number accepted
     * @param(sortBy): string accepted
     * @param(sortDirection): number 1 or -1 accepted
     * @param(filter): string accepted
     *
     * @returns get list of Links
     */
    async getLastHashSequenceNumber(): Promise<Links[]> {
        const sorting = {_id: -1};
        const res = this.linksModel.links.find()
                    .limit(1)
                    .sort(sorting);
        const result = await res.then((data) => {
            return data;
        });
        return result;
    }
}
