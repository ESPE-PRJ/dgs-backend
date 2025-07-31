import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ServerEnvironmentEnum } from 'config/server.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = app.get(ConfigService);
  const logger = new Logger('ServerInfo');

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle(ServerEnvironmentEnum.SERVER_NAME)
    .setDescription(`${ServerEnvironmentEnum.SERVER_NAME} API`)
    .setVersion('1.0')
    .addTag('DGS')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  logger.log(
    `Server: ${serverConfig.get(ServerEnvironmentEnum.SERVER_NAME)} | Header: ${serverConfig.get(ServerEnvironmentEnum.SERVER_HEADER)} | Version: ${serverConfig.get(ServerEnvironmentEnum.SERVER_VERSION)} | Port: ${serverConfig.get(ServerEnvironmentEnum.SERVER_PORT)}`,
  );

  await app.listen(serverConfig.get(ServerEnvironmentEnum.SERVER_PORT) ?? 3000);
}
void bootstrap();
