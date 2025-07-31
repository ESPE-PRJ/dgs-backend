import { Module } from '@nestjs/common';
import { HealthTrackingService } from './health-tracking.service';
import { HealthTrackingController } from './health-tracking.controller';

@Module({
  controllers: [HealthTrackingController],
  providers: [HealthTrackingService],
})
export class HealthTrackingModule {}
