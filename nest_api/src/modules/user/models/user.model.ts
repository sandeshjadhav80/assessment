import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserModel {
    constructor(@InjectModel('Users') public readonly user: Model<User>) {}
}