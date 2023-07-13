import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CoversService } from './covers.service';

interface IImageInfo {
    imageType: 'image/jpeg' | 'image/png';
    bufferData: string;
}

@Controller('covers')
export class CoversController {
    constructor(private readonly coversService: CoversService) {}

    @MessagePattern('submit_cover')
    async submitCover(@Payload() imageInfo: IImageInfo) {
        return await this.coversService.submitCover(imageInfo);
    }
}
