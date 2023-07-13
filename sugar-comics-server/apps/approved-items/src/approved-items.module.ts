import { Module } from '@nestjs/common';
import { ApprovedItemsController } from './approved-items.controller';
import { ApprovedItemsService } from './approved-items.service';

@Module({
  imports: [],
  controllers: [ApprovedItemsController],
  providers: [ApprovedItemsService],
})
export class ApprovedItemsModule {}
