import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ItemsService } from './items.service';
import { SubmitItemRequest } from './model/submit-item.request';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @MessagePattern('submit_item')
    async submitItem(@Payload() item: SubmitItemRequest) {
        return await this.itemsService.create(item);
    }

    @MessagePattern('preview_all_submitted_items')
    async previewAllSubmittedItems() {
        return await this.itemsService.previewAllSubmittedItems();
    }

    @MessagePattern('get_submitted_item_by_id')
    async getSubmittedItemById(@Payload() id: number) {
        return await this.itemsService.getSubmittedItemById(id);
    }

    @MessagePattern('delete_submitted_item_by_id')
    async deleteSubmittedItemById(@Payload() id: number) {
        return await this.itemsService.deleteSubmittedItemById(id);
    }
}
