import { Injectable } from '@nestjs/common';

@Injectable()
export class ApprovedItemsService {
  getHello(): string {
    return 'Hello World!';
  }
}
