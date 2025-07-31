import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';

export class CreatePrescripcionDto {
  @IsUUID()
  pacienteId: string;

  @IsUUID()
  profesionalSaludId: string;

  @IsString()
  motivo: string;

  @IsString()
  instrucciones: string;

  @IsBoolean()
  @IsOptional()
  vigente?: boolean;
}
