import { PartialType } from '@nestjs/mapped-types';
import { CreatePrescripcionMedicamentoDto } from './create-prescripcion-medicamento.dto';

export class UpdatePrescripcionMedicamentoDto extends PartialType(
  CreatePrescripcionMedicamentoDto,
) {}
