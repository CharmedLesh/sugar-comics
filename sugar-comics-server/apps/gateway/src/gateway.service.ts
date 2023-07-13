import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { SubmitItemRequest } from './model/submit-item.request';

@Injectable()
export class GatewayService {
    constructor(@Inject('SUBMITTED_ITEMS_SERVICE') private readonly submittedItemsClient: ClientProxy) {}

    async submitCover(cover: Express.Multer.File) {
        const imageType = cover.mimetype;
        if (imageType === 'image/jpeg' || imageType === 'image/png') {
            const buffer = cover.buffer;
            const bufferString = JSON.stringify(buffer);

            const imageNameObservable = this.submittedItemsClient.send('submit_cover', {
                imageType: imageType,
                bufferData: bufferString
            });
            const imageName = await lastValueFrom(imageNameObservable);
            return imageName;
        }

        throw new HttpException('Only jpg or png allowed', HttpStatus.BAD_REQUEST);
    }

    submitItem(item: SubmitItemRequest) {
        return this.submittedItemsClient.send('submit_item', item);
    }

    previewAllSubmittedItems() {
        return this.submittedItemsClient.send('preview_all_submitted_items', {});
    }

    async getSubmittedItemById(id: number) {
        const itemObservable = this.submittedItemsClient.send('get_submitted_item_by_id', id);
        const item = await lastValueFrom(itemObservable);

        if (item) {
            return item;
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    deleteSubmittedItemById(id: number) {
        return this.submittedItemsClient.emit('delete_submitted_item_by_id', id);
    }
}
