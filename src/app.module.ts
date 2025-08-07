import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import serverConfig from 'config/server.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AuthModule } from './auth/auth.module';
import { CommunicationModule } from './communication/communication.module';
import { HealthTrackingModule } from './health-tracking/health-tracking.module';
import databaseConfig from 'config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [serverConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(
      databaseConfig.asProvider() as Partial<PostgresConnectionOptions>,
    ),
    AuthModule,
    CommunicationModule,
    HealthTrackingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
