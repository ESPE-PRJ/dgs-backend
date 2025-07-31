import {
  IsUUID,
  IsBoolean,
  IsOptional,
  IsDateString,
  IsString,
} from 'class-validator';

export class CreateRegistroAdherenciaDto {
  @IsUUID()
  recordatorioId: string;

  @IsUUID()
  pacienteId: string;

  @IsBoolean()
  suministrado: boolean;

  @IsOptional()
  @IsDateString()
  fecha_suministro?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
