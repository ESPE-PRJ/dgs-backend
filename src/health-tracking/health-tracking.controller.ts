import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthTrackingService } from './health-tracking.service';
import { CreateHealthTrackingDto } from './dto/create-health-tracking.dto';
import { UpdateHealthTrackingDto } from './dto/update-health-tracking.dto';

@Controller('health-tracking')
export class HealthTrackingController {
  constructor(private readonly healthTrackingService: HealthTrackingService) {}

  @Post()
  create(@Body() createHealthTrackingDto: CreateHealthTrackingDto) {
    return this.healthTrackingService.create(createHealthTrackingDto);
  }

  @Get()
  findAll() {
    return this.healthTrackingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthTrackingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthTrackingDto: UpdateHealthTrackingDto) {
    return this.healthTrackingService.update(+id, updateHealthTrackingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthTrackingService.remove(+id);
  }
}
