import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmittedItem } from './model/items.entity';
import { RewardsModule } from '../rewards/rewards.module';
import { CoversModule } from '../covers/covers.module';

@Module({
    imports: [TypeOrmModule.forFeature([SubmittedItem]), RewardsModule, CoversModule],
    controllers: [ItemsController],
    providers: [ItemsService]
})
export class ItemsModule {}
