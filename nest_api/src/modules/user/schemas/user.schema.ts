import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,

    email: String,

    password: String,

    white_label_host: String,

},{
    timestamps: true
});
