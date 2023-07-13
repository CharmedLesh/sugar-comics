import { Controller, Get } from '@nestjs/common';
import { ApprovedItemsService } from './approved-items.service';

@Controller()
export class ApprovedItemsController {
  constructor(private readonly approvedItemsService: ApprovedItemsService) {}

  @Get()
  getHello(): string {
    return this.approvedItemsService.getHello();
  }
}
