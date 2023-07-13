import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmittedCover } from './model/covers.entity';
import { Repository } from 'typeorm';
import { ImagesService } from '@app/common';

interface IImageInfo {
    imageType: 'image/jpeg' | 'image/png';
    bufferData: string;
}

@Injectable()
export class CoversService {
    constructor(
        @InjectRepository(SubmittedCover) private readonly coversRepository: Repository<SubmittedCover>,
        private imagesService: ImagesService
    ) {}
    private readonly logger = new Logger(CoversService.name);

    async submitCover(imageInfo: IImageInfo) {
        const coverName = await this.imagesService.createImage(imageInfo, '../../../static', 'covers');
        const writeDataAboutImageToDB = await this.coversRepository.save({ image: coverName });
        return writeDataAboutImageToDB;
    }

    async deleteCoverByName(coverNameWithExtention: string) {
        try {
            this.logger.log(`Deleting cover with name: ${coverNameWithExtention}...`);
            await this.coversRepository.delete({ image: coverNameWithExtention });
            await this.imagesService.deleteImage(coverNameWithExtention, '../../../static', 'covers');
        } catch (error) {
            console.log(error);
        }
    }
}
