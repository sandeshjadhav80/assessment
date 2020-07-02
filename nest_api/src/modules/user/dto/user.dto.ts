import { IsString, IsInt, IsNotEmpty, } from 'class-validator';

export class UserDto {
    readonly _id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    white_label_host: string;

    created_at: Date;

    updated_at: Date;

}