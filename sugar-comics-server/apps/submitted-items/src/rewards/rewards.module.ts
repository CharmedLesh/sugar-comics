import { Module } from '@nestjs/common';
import { RewardsController } from './rewards.controller';
import { RewardsService } from './rewards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmittedReward } from './model/rewards.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SubmittedReward])],
    exports: [RewardsService],
    controllers: [RewardsController],
    providers: [RewardsService]
})
export class RewardsModule {}
