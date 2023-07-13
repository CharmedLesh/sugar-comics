import { Module } from '@nestjs/common';
import { ImagesService } from './images.serivce';

@Module({
    providers: [ImagesService],
    exports: [ImagesService]
})
export class FilesModule {}
