import { Document } from 'mongoose';

export interface Links extends Document {
    _id: string;
    url: string;

    url_hash: number;

    short_url: string;

}