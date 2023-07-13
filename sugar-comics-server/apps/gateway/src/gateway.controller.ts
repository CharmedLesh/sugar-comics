import { Controller, Post, Body, Get, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { SubmitItemRequest } from './model/submit-item.request';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class GatewayController {
    constructor(private readonly gatewayService: GatewayService) {}

    @Post('/submit-cover')
    @UseInterceptors(FileInterceptor('image'))
    submitCover(@UploadedFile() cover: Express.Multer.File) {
        return this.gatewayService.submitCover(cover);
    }

    @Post('/submit-item')
    submitItem(@Body() item: SubmitItemRequest) {
        return this.gatewayService.submitItem(item);
    }

    @Get('/preview-all-submitted-items')
    previewAllSubmittedItems() {
        return this.gatewayService.previewAllSubmittedItems();
    }

    @Get('/submitted-item/:id')
    async getSubmittedItemById(@Param('id') id: number) {
        return await this.gatewayService.getSubmittedItemById(id);
    }

    @Delete('/delete-submitted-item/:id')
    deleteSubmittedItemById(@Param('id') id: number) {
        return this.gatewayService.deleteSubmittedItemById(id);
    }
}
