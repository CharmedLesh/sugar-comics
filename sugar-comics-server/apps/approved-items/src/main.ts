import { NestFactory } from '@nestjs/core';
import { ApprovedItemsModule } from './approved-items.module';

async function bootstrap() {
  const app = await NestFactory.create(ApprovedItemsModule);
  await app.listen(3000);
}
bootstrap();
