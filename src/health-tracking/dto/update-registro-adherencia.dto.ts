import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroAdherenciaDto } from './create-registro-adherencia.dto';

export class UpdateRegistroAdherenciaDto extends PartialType(
  CreateRegistroAdherenciaDto,
) {}
