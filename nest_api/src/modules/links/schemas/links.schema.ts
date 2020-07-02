import * as mongoose from 'mongoose';

export const LinksSchema = new mongoose.Schema({
    url: String,

    url_hash: Number,

    short_url: String,

},{
    timestamps: true
});
