import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

interface IImageInfo {
    imageType: 'image/jpeg' | 'image/png';
    bufferData: string;
}

@Injectable()
export class ImagesService {
    async createImage(imageInfo: IImageInfo, pathToFolder: string, folder: string): Promise<string> {
        try {
            const fileName = uuid.v4() + (imageInfo.imageType === 'image/jpeg' ? '.jpg' : '.png');
            const filePath = path.resolve(__dirname, pathToFolder, folder);
            const instanceOfBuffer = Buffer.from(JSON.parse(imageInfo.bufferData));

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.join(filePath, fileName), instanceOfBuffer);

            return fileName;
        } catch (error) {
            console.log(error);
            throw new HttpException('Error occured while writing file', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteImage(imageNameWithExtention: string, pathToFolder: string, folder: string) {
        try {
            const filePath = path.resolve(__dirname, pathToFolder, folder);
            fs.unlinkSync(path.join(filePath, imageNameWithExtention));
        } catch (error) {
            console.log(error);
            throw new HttpException('Error occurred while deleting file', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
