import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { SubmittedItem } from './model/items.entity';
import { SubmitItemRequest } from './model/submit-item.request';
import { RewardsService } from '../rewards/rewards.service';
import { CoversService } from '../covers/covers.service';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(SubmittedItem) private readonly itemsRepository: Repository<SubmittedItem>,
        private rewardsService: RewardsService,
        private coversService: CoversService,
        private itemsDataSource: DataSource
    ) {}
    private readonly logger = new Logger(ItemsService.name);

    async create(item: SubmitItemRequest) {
        const queryRunner = this.itemsDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            this.logger.log('Submitting item transaction started.');
            const itemData = await this.itemsRepository.save(item);

            if (item.rewards && item.rewards.length > 0) {
                for (let i = 0; i < item.rewards.length; i++) {
                    const reward = item.rewards[i];
                    const rewardAttachedToItem = { ...reward, itemId: itemData.id };
                    await this.rewardsService.create(rewardAttachedToItem);
                }
            }

            await queryRunner.commitTransaction();
            return itemData;
        } catch (error) {
            this.logger.log('Submitting item transaction failed.');
            await queryRunner.rollbackTransaction();
        } finally {
            this.logger.log('Submitting item transaction released.');
            await queryRunner.release();
        }
    }

    async previewAllSubmittedItems() {
        return await this.itemsRepository.find({
            select: {
                id: true,
                name: true,
                author: true,
                description: true,
                estimated: true
            },
            relations: {
                cover: true
            }
        });
    }

    async getSubmittedItemById(id: number) {
        const item = await this.itemsRepository.findOne({
            where: {
                id: id
            },
            relations: {
                rewards: true,
                cover: true
            }
        });

        return item;
    }

    async getCoverNameByItemId(itemId: number): Promise<string> {
        const itemByIdToGetCoverName = await this.itemsRepository.findOne({
            select: {
                id: true
            },
            where: {
                id: itemId
            },
            relations: {
                cover: true
            }
        });
        const coverNameWithExtention = itemByIdToGetCoverName.cover.image;
        return coverNameWithExtention;
    }

    async deleteSubmittedItemById(id: number) {
        const queryRunner = this.itemsDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            this.logger.log('Deleting submitted item transaction started.');
            const coverNameWithExtention = await this.getCoverNameByItemId(id);

            this.logger.log('Deleting related rewards...');
            await this.rewardsService.deleteRewardsByItemId(id);

            this.logger.log(`Deleting product with id:${id}...`);
            await this.itemsRepository.delete(id);

            this.logger.log('Deleting related cover...');
            await this.coversService.deleteCoverByName(coverNameWithExtention);

            await queryRunner.commitTransaction();
            return HttpStatus.OK;
        } catch (error) {
            this.logger.log('Deleting submitted item transaction failed.');
            console.log(error);
            await queryRunner.rollbackTransaction();
        } finally {
            this.logger.log('Deleting submitted item transaction released.');
            await queryRunner.release();
        }
    }

    // async approveSubmittedItemById(id: number) {}
}
