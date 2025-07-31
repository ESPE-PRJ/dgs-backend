import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// ENTIDADES
import { Medicamento } from './entities/medicamento.entity';
import { Prescripcion } from './entities/prescripcion.entity';
import { PrescripcionMedicamento } from './entities/prescripcion-medicamento.entity';
import { RegistroAdherencia } from './entities/registro-adherencia.entity';
import { SignosVitales } from './entities/signos-vitales.entity';

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

@Injectable()
export class HealthTrackingService {
  constructor(
    @InjectRepository(Medicamento)
    private readonly medicamentoRepo: Repository<Medicamento>,

    @InjectRepository(Prescripcion)
    private readonly prescripcionRepo: Repository<Prescripcion>,

    @InjectRepository(PrescripcionMedicamento)
    private readonly prescripcionMedicamentoRepo: Repository<PrescripcionMedicamento>,

    @InjectRepository(RegistroAdherencia)
    private readonly registroAdherenciaRepo: Repository<RegistroAdherencia>,

    @InjectRepository(SignosVitales)
    private readonly signosVitalesRepo: Repository<SignosVitales>,
  ) {}

  // ---------- CRUD MEDICAMENTO ----------
  async createMedicamento(dto: CreateMedicamentoDto): Promise<Medicamento> {
    const medicamento = this.medicamentoRepo.create(dto);
    return this.medicamentoRepo.save(medicamento);
  }

  async findAllMedicamentos(): Promise<Medicamento[]> {
    return this.medicamentoRepo.find();
  }

  async findOneMedicamento(id: string): Promise<Medicamento> {
    const medicamento = await this.medicamentoRepo.findOne({ where: { id } });
    if (!medicamento) throw new NotFoundException(`Medicamento ${id} no existe`);
    return medicamento;
  }

  async updateMedicamento(
    id: string,
    dto: UpdateMedicamentoDto,
  ): Promise<Medicamento> {
    const medicamento = await this.findOneMedicamento(id);
    Object.assign(medicamento, dto);
    return this.medicamentoRepo.save(medicamento);
  }

  async removeMedicamento(id: string): Promise<void> {
    const medicamento = await this.findOneMedicamento(id);
    await this.medicamentoRepo.remove(medicamento);
  }

  // ---------- CRUD PRESCRIPCION ----------
  async createPrescripcion(dto: CreatePrescripcionDto): Promise<Prescripcion> {
    const prescripcion = this.prescripcionRepo.create({
      ...dto,
      paciente: { id: dto.pacienteId },
      profesional_salud: { id: dto.profesionalSaludId },
    });
    return this.prescripcionRepo.save(prescripcion);
  }

  async findAllPrescripciones(): Promise<Prescripcion[]> {
    return this.prescripcionRepo.find({
      relations: ['paciente', 'profesional_salud', 'prescripcion_medicamentos'],
    });
  }

  async findOnePrescripcion(id: string): Promise<Prescripcion> {
    const prescripcion = await this.prescripcionRepo.findOne({
      where: { id },
      relations: ['paciente', 'profesional_salud', 'prescripcion_medicamentos'],
    });
    if (!prescripcion) throw new NotFoundException(`Prescripcion ${id} no existe`);
    return prescripcion;
  }

  async updatePrescripcion(
    id: string,
    dto: UpdatePrescripcionDto,
  ): Promise<Prescripcion> {
    const prescripcion = await this.findOnePrescripcion(id);
    Object.assign(prescripcion, dto);
    return this.prescripcionRepo.save(prescripcion);
  }

  async removePrescripcion(id: string): Promise<void> {
    const prescripcion = await this.findOnePrescripcion(id);
    await this.prescripcionRepo.remove(prescripcion);
  }

  // ---------- CRUD PRESCRIPCION MEDICAMENTO ----------
  async createPrescripcionMedicamento(
    dto: CreatePrescripcionMedicamentoDto,
  ): Promise<PrescripcionMedicamento> {
    const entity = this.prescripcionMedicamentoRepo.create({
      ...dto,
      prescripcion: { id: dto.prescripcionId },
      medicamento: { id: dto.medicamentoId },
    });
    return this.prescripcionMedicamentoRepo.save(entity);
  }

  async findAllPrescripcionMedicamentos(): Promise<PrescripcionMedicamento[]> {
    return this.prescripcionMedicamentoRepo.find({
      relations: ['prescripcion', 'medicamento', 'recordatorios'],
    });
  }

  async findOnePrescripcionMedicamento(
    id: string,
  ): Promise<PrescripcionMedicamento> {
    const entity = await this.prescripcionMedicamentoRepo.findOne({
      where: { id },
      relations: ['prescripcion', 'medicamento', 'recordatorios'],
    });
    if (!entity) throw new NotFoundException(`PrescripcionMedicamento ${id} no existe`);
    return entity;
  }

  async updatePrescripcionMedicamento(
    id: string,
    dto: UpdatePrescripcionMedicamentoDto,
  ): Promise<PrescripcionMedicamento> {
    const entity = await this.findOnePrescripcionMedicamento(id);
    Object.assign(entity, dto);
    return this.prescripcionMedicamentoRepo.save(entity);
  }

  async removePrescripcionMedicamento(id: string): Promise<void> {
    const entity = await this.findOnePrescripcionMedicamento(id);
    await this.prescripcionMedicamentoRepo.remove(entity);
  }

  // ---------- CRUD REGISTRO ADHERENCIA ----------
  async createRegistroAdherencia(
    dto: CreateRegistroAdherenciaDto,
  ): Promise<RegistroAdherencia> {
    const entity = this.registroAdherenciaRepo.create({
      ...dto,
      recordatorio: { id: dto.recordatorioId },
      paciente: { id: dto.pacienteId },
    });
    return this.registroAdherenciaRepo.save(entity);
  }

  async findAllRegistroAdherencias(): Promise<RegistroAdherencia[]> {
    return this.registroAdherenciaRepo.find({
      relations: ['recordatorio', 'paciente'],
    });
  }

  async findOneRegistroAdherencia(id: string): Promise<RegistroAdherencia> {
    const entity = await this.registroAdherenciaRepo.findOne({
      where: { id },
      relations: ['recordatorio', 'paciente'],
    });
    if (!entity) throw new NotFoundException(`RegistroAdherencia ${id} no existe`);
    return entity;
  }

  async updateRegistroAdherencia(
    id: string,
    dto: UpdateRegistroAdherenciaDto,
  ): Promise<RegistroAdherencia> {
    const entity = await this.findOneRegistroAdherencia(id);
    Object.assign(entity, dto);
    return this.registroAdherenciaRepo.save(entity);
  }

  async removeRegistroAdherencia(id: string): Promise<void> {
    const entity = await this.findOneRegistroAdherencia(id);
    await this.registroAdherenciaRepo.remove(entity);
  }

  // ---------- CRUD SIGNOS VITALES ----------
  async createSignosVitales(
    dto: CreateSignosVitalesDto,
  ): Promise<SignosVitales> {
    const entity = this.signosVitalesRepo.create({
      ...dto,
      paciente: { id: dto.pacienteId },
    });
    return this.signosVitalesRepo.save(entity);
  }

  async findAllSignosVitales(): Promise<SignosVitales[]> {
    return this.signosVitalesRepo.find({ relations: ['paciente'] });
  }

  async findOneSignosVitales(id: string): Promise<SignosVitales> {
    const entity = await this.signosVitalesRepo.findOne({
      where: { id },
      relations: ['paciente'],
    });
    if (!entity) throw new NotFoundException(`SignosVitales ${id} no existe`);
    return entity;
  }

  async updateSignosVitales(
    id: string,
    dto: UpdateSignosVitalesDto,
  ): Promise<SignosVitales> {
    const entity = await this.findOneSignosVitales(id);
    Object.assign(entity, dto);
    return this.signosVitalesRepo.save(entity);
  }

  async removeSignosVitales(id: string): Promise<void> {
    const entity = await this.findOneSignosVitales(id);
    await this.signosVitalesRepo.remove(entity);
  }
}
