import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required()
            }),
            envFilePath: './apps/gateway/.env'
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../../static', 'covers'),
            serveRoot: '/static/covers'
        }),
        ClientsModule.register([
            {
                name: 'SUBMITTED_ITEMS_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'submitted_items_queue',
                    queueOptions: {
                        durable: false
                    }
                }
            }
        ])
    ],
    controllers: [GatewayController],
    providers: [GatewayService]
})
export class GatewayModule {}
