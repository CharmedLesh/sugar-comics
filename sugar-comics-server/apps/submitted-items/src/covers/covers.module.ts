import { Module } from '@nestjs/common';
import { CoversService } from './covers.service';
import { CoversController } from './covers.controller';
import { SubmittedCover } from './model/covers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '@app/common';

@Module({
    imports: [TypeOrmModule.forFeature([SubmittedCover]), FilesModule],
    exports: [CoversService],
    providers: [CoversService],
    controllers: [CoversController]
})
export class CoversModule {}
