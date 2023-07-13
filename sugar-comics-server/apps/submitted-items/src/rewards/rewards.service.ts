import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmitRewardRequest } from './model/submit-reward.request';
import { SubmittedReward } from './model/rewards.entity';

@Injectable()
export class RewardsService {
    constructor(@InjectRepository(SubmittedReward) private readonly rewardsRepository: Repository<SubmittedReward>) {}
    private readonly logger = new Logger(RewardsService.name);

    async create(reward: SubmitRewardRequest) {
        return this.rewardsRepository.save(reward);
    }

    async deleteRewardsByItemId(itemId: number) {
        this.logger.log(`Deleting rewards with itemId:${itemId}...`);
        return this.rewardsRepository.delete({ itemId: itemId });
    }
}
