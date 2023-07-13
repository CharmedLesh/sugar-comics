import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { RewardsModule } from './rewards/rewards.module';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { CoversModule } from './covers/covers.module';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DATABASE_HOST: Joi.string().required(),
                DATABASE_PORT: Joi.number().required(),
                DATABASE_USER: Joi.string().required(),
                DATABASE_PASSWORD: Joi.string().required(),
                DATABASE_NAME: Joi.string().required(),
                AUTOLOAD_ENTITIES: Joi.number().required()
            }),
            envFilePath: './apps/submitted-items/.env'
        }),
        DatabaseModule,
        ItemsModule,
        RewardsModule,
        CoversModule
    ]
})
export class SubmittedItemsModule {}
