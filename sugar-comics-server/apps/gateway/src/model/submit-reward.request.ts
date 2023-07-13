import { LimitValidator } from '@app/common/validators/limitValidator';
import { IsBoolean, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

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
    @IsPositive()
    @IsInt()
    itemId: number;
}
