import { LimitValidator } from '@app/common/validators/limitValidator';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class SubmitRewardRequest {
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

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @IsInt()
    itemId: number;
}
