import { Injectable } from '@nestjs/common';
import { CreateHealthTrackingDto } from './dto/create-health-tracking.dto';
import { UpdateHealthTrackingDto } from './dto/update-health-tracking.dto';

@Injectable()
export class HealthTrackingService {
  create(createHealthTrackingDto: CreateHealthTrackingDto) {
    return 'This action adds a new healthTracking';
  }

  findAll() {
    return `This action returns all healthTracking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} healthTracking`;
  }

  update(id: number, updateHealthTrackingDto: UpdateHealthTrackingDto) {
    return `This action updates a #${id} healthTracking`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthTracking`;
  }
}
