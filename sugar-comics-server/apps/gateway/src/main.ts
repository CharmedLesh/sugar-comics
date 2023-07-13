import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(GatewayModule);
    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT') || 5000;
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
