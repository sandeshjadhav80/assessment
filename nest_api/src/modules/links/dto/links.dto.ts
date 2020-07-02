import { IsNotEmpty } from 'class-validator';

export class LinksDto {
    readonly _id: string;

    @IsNotEmpty()
    url: string;

    url_hash: number;

    short_url: string;

    created_at: Date;

    updated_at: Date;

}