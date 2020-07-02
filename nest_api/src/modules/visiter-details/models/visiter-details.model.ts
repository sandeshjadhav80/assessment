import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VisiterDetails } from '../interfaces/visiter-details.interface';

@Injectable()
export class VisiterDetailsModel {
    constructor(@InjectModel('VisiterDetailss') public readonly visiterDetails: Model<VisiterDetails>) {}
}