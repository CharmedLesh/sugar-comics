import { NestFactory } from '@nestjs/core';
import { SubmittedItemsModule } from './submitted-items.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(SubmittedItemsModule, {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'submitted_items_queue',
            queueOptions: {
                durable: false
            }
        }
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.listen();
}

bootstrap();
