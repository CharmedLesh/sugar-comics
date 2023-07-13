import { IsArray, IsNotEmpty, IsInt, IsPositive, IsString, ValidateNested, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { IsYoutubeLink, LimitValidator } from '@app/common';

class Reward {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    price: number;

    @IsBoolean()
    @IsNotEmpty()
    limited: boolean;

    @LimitValidator('limited')
    limit: number;

    @IsString()
    @IsNotEmpty()
    description: string;
}

export class SubmitItemRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    estimated: number;

    @IsString()
    @IsYoutubeLink()
    video: string;

    @IsString()
    story: string;

    @IsNumber()
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    coverId: number;

    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => Reward)
    rewards: Reward[];
}
