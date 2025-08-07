import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthTrackingDto } from './create-health-tracking.dto';

export class UpdateHealthTrackingDto extends PartialType(CreateHealthTrackingDto) {}
