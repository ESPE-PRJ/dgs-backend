import { IsUUID, IsString, IsDateString } from 'class-validator';

export class CreatePrescripcionMedicamentoDto {
  @IsUUID()
  prescripcionId: string;

  @IsUUID()
  medicamentoId: string;

  @IsString()
  dosis: string;

  @IsString()
  frecuencia: string;

  @IsString()
  via_administracion: string;

  @IsString()
  observaciones: string;

  @IsDateString()
  fecha_inicio: string;

  @IsDateString()
  fecha_fin: string;
}
