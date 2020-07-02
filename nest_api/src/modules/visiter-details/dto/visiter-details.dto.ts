import { IsString, IsInt, IsNotEmpty, } from 'class-validator';
import { timestamp } from 'aws-sdk/clients/cloudfront';

export class VisiterDetailsDto {
    
    @IsNotEmpty()
    user_agent: string;

    @IsNotEmpty()
    http_headers: string;

    @IsNotEmpty()
    time: Date;

    @IsNotEmpty()
    ip: string;

    @IsNotEmpty()
    referer: string;

    created_at?: Date;

    updated_at?: Date;

}