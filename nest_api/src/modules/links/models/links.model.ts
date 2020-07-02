import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Links } from '../interfaces/links.interface';

@Injectable()
export class LinksModel {
    constructor(@InjectModel('Linkss') public readonly links: Model<Links>) {}
}