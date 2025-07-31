import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HealthTrackingService } from './health-tracking.service';

// DTOs
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { CreatePrescripcionDto } from './dto/create-prescripcion.dto';
import { UpdatePrescripcionDto } from './dto/update-prescripcion.dto';
import { CreatePrescripcionMedicamentoDto } from './dto/create-prescripcion-medicamento.dto';
import { UpdatePrescripcionMedicamentoDto } from './dto/update-prescripcion-medicamento.dto';
import { CreateRegistroAdherenciaDto } from './dto/create-registro-adherencia.dto';
import { UpdateRegistroAdherenciaDto } from './dto/update-registro-adherencia.dto';
import { CreateSignosVitalesDto } from './dto/create-signos-vitales.dto';
import { UpdateSignosVitalesDto } from './dto/update-signos-vitales.dto';

@Controller('health-tracking')
export class HealthTrackingController {
  constructor(private readonly healthTrackingService: HealthTrackingService) {}

  // ----------- MEDICAMENTO -----------
  @Post('medicamento')
  createMedicamento(@Body() dto: CreateMedicamentoDto) {
    return this.healthTrackingService.createMedicamento(dto);
  }

  @Get('medicamento')
  findAllMedicamentos() {
    return this.healthTrackingService.findAllMedicamentos();
  }

  @Get('medicamento/:id')
  findOneMedicamento(@Param('id') id: string) {
    return this.healthTrackingService.findOneMedicamento(id);
  }

  @Patch('medicamento/:id')
  updateMedicamento(
    @Param('id') id: string,
    @Body() dto: UpdateMedicamentoDto,
  ) {
    return this.healthTrackingService.updateMedicamento(id, dto);
  }

  @Delete('medicamento/:id')
  removeMedicamento(@Param('id') id: string) {
    return this.healthTrackingService.removeMedicamento(id);
  }

  // ----------- PRESCRIPCION -----------
  @Post('prescripcion')
  createPrescripcion(@Body() dto: CreatePrescripcionDto) {
    return this.healthTrackingService.createPrescripcion(dto);
  }

  @Get('prescripcion')
  findAllPrescripciones() {
    return this.healthTrackingService.findAllPrescripciones();
  }

  @Get('prescripcion/:id')
  findOnePrescripcion(@Param('id') id: string) {
    return this.healthTrackingService.findOnePrescripcion(id);
  }

  @Patch('prescripcion/:id')
  updatePrescripcion(
    @Param('id') id: string,
    @Body() dto: UpdatePrescripcionDto,
  ) {
    return this.healthTrackingService.updatePrescripcion(id, dto);
  }

  @Delete('prescripcion/:id')
  removePrescripcion(@Param('id') id: string) {
    return this.healthTrackingService.removePrescripcion(id);
  }

  // ----------- PRESCRIPCION MEDICAMENTO -----------
  @Post('prescripcion-medicamento')
  createPrescripcionMedicamento(@Body() dto: CreatePrescripcionMedicamentoDto) {
    return this.healthTrackingService.createPrescripcionMedicamento(dto);
  }

  @Get('prescripcion-medicamento')
  findAllPrescripcionMedicamentos() {
    return this.healthTrackingService.findAllPrescripcionMedicamentos();
  }

  @Get('prescripcion-medicamento/:id')
  findOnePrescripcionMedicamento(@Param('id') id: string) {
    return this.healthTrackingService.findOnePrescripcionMedicamento(id);
  }

  @Patch('prescripcion-medicamento/:id')
  updatePrescripcionMedicamento(
    @Param('id') id: string,
    @Body() dto: UpdatePrescripcionMedicamentoDto,
  ) {
    return this.healthTrackingService.updatePrescripcionMedicamento(id, dto);
  }

  @Delete('prescripcion-medicamento/:id')
  removePrescripcionMedicamento(@Param('id') id: string) {
    return this.healthTrackingService.removePrescripcionMedicamento(id);
  }

  // ----------- REGISTRO ADHERENCIA -----------
  @Post('registro-adherencia')
  createRegistroAdherencia(@Body() dto: CreateRegistroAdherenciaDto) {
    return this.healthTrackingService.createRegistroAdherencia(dto);
  }

  @Get('registro-adherencia')
  findAllRegistroAdherencias() {
    return this.healthTrackingService.findAllRegistroAdherencias();
  }

  @Get('registro-adherencia/:id')
  findOneRegistroAdherencia(@Param('id') id: string) {
    return this.healthTrackingService.findOneRegistroAdherencia(id);
  }

  @Patch('registro-adherencia/:id')
  updateRegistroAdherencia(
    @Param('id') id: string,
    @Body() dto: UpdateRegistroAdherenciaDto,
  ) {
    return this.healthTrackingService.updateRegistroAdherencia(id, dto);
  }

  @Delete('registro-adherencia/:id')
  removeRegistroAdherencia(@Param('id') id: string) {
    return this.healthTrackingService.removeRegistroAdherencia(id);
  }

  // ----------- SIGNOS VITALES -----------
  @Post('signos-vitales')
  createSignosVitales(@Body() dto: CreateSignosVitalesDto) {
    return this.healthTrackingService.createSignosVitales(dto);
  }

  @Get('signos-vitales')
  findAllSignosVitales() {
    return this.healthTrackingService.findAllSignosVitales();
  }

  @Get('signos-vitales/:id')
  findOneSignosVitales(@Param('id') id: string) {
    return this.healthTrackingService.findOneSignosVitales(id);
  }

  @Patch('signos-vitales/:id')
  updateSignosVitales(
    @Param('id') id: string,
    @Body() dto: UpdateSignosVitalesDto,
  ) {
    return this.healthTrackingService.updateSignosVitales(id, dto);
  }

  @Delete('signos-vitales/:id')
  removeSignosVitales(@Param('id') id: string) {
    return this.healthTrackingService.removeSignosVitales(id);
  }
}
