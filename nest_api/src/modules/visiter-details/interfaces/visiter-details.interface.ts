import { Document } from 'mongoose';

export interface VisiterDetails extends Document {
    _id: string;
    user_agent: string;

    http_headers: string;

    time: string;

    ip: string;

    referer: string;

}