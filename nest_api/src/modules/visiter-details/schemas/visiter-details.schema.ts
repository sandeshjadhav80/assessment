import * as mongoose from 'mongoose';

export const VisiterDetailsSchema = new mongoose.Schema({
    user_agent: String,

    http_headers: String,

    time: String,

    ip: String,

    referer: String,

},{
    timestamps: true
});
