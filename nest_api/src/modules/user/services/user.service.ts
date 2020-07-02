import { Injectable, Inject } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { UserDto } from '../dto/user.dto';
import { UserModel } from '../models/user.model';
import { MailService, HelperService, MailInterface } from '../../common/index';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
    
    constructor(
        private readonly userModel: UserModel,
        private readonly mailService: MailService,
        private readonly helperService: HelperService,
    ) {}
       
    /**
     * @summary create new User
     *
     * @param(userDto): object type with User details
     *
     * @returns object with Promise<User>
     */
    async create(userDto: UserDto): Promise<User | null> {
        userDto.password = bcrypt.hashSync(userDto.password, 10);
        const res = this.userModel.user.create(userDto);
        const result = await res.then((data) => {
            return data;
        });
        return result;
    }
    /**
     * @summary get all User list
     *
     * @param(pageNumber): number accepted
     * @param(pageSize): number accepted
     * @param(sortBy): string accepted
     * @param(sortDirection): number 1 or -1 accepted
     * @param(filter): string accepted
     *
     * @returns get list of User
     */
    async findAll(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, filter: string): Promise<User[]> {
        const sorting = {};
        if (typeof sortBy === 'undefined' || typeof sortDirection === 'undefined') {
            sorting['_id'] = -1;
        } else {
            sorting[sortBy] = parseInt(sortDirection);
        }
        pageNumber = (pageNumber < 0) ? 0 : pageNumber;
        const res = this.userModel.user.find()
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
        const res = this.userModel.user.find().count();
        const result = await res.then((data) => {
            return data;
        });
        return result;
    }
    /**
     * @summary get detail of User
     *
     * @param(id): number accepted
     *
     * @returns detail or empty
     */
    async findOne(userId: string): Promise<User | null> {
        let result = null;
        if (userId.match(/^[0-9a-fA-F]{24}$/)) {
            const res = this.userModel.user.findById(userId).exec();
            result = await res.then((data) => {
                return data;
            });
        }
        return result;
    }
    /**
     * @summary update the User detail
     *
     * @param(userId): number accepted
     * @param(userDto): User object in body accepted
     *
     * @returns success or fail
     */
    async update(userId: string, userDto: UserDto): Promise<User | null | boolean> {
        let result = false;
        if (userId.match(/^[0-9a-fA-F]{24}$/)) {
            const res = this.userModel.user.findByIdAndUpdate(userId, userDto, {new: true});
            result = await res.then((data) => {
                return data;
            });
        }
        return result;
    }
    /**
     * @summary delete User id
     *
     * @param(userId): number accepted
     *
     * @returns success or fail
     */
    async remove(userId: string): Promise<User | null> {
        let result = null;
        if (userId.match(/^[0-9a-fA-F]{24}$/)) {
            const res =  this.userModel.user.findByIdAndDelete(userId);
            result = await res.then((data) => {
                return data;
            });
        }
        return result;
    }
}
