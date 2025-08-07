import {
  IsUUID,
  IsBoolean,
  IsOptional,
  IsDateString,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRegistroAdherenciaDto {
  @ApiProperty({ example: 'a57ad3a5-2f0b-468a-a07a-0f0d789a0a85', description: 'ID del recordatorio asociado (UUID)' })
  @IsUUID()
  recordatorioId: string;

  @ApiProperty({ example: 'e821f1de-0d8b-45ee-b9d6-8f7e264f6f0a', description: 'ID del paciente (UUID)' })
  @IsUUID()
  pacienteId: string;

  @ApiProperty({ example: true, description: 'Indica si la medicación fue suministrada' })
  @IsBoolean()
  suministrado: boolean;

  @ApiPropertyOptional({ example: '2025-08-07T08:00:00.000Z', description: 'Fecha y hora en que se suministró la medicación' })
  @IsOptional()
  @IsDateString()
  fecha_suministro?: string;

  @ApiPropertyOptional({ example: 'Paciente reporta olvido de dosis', description: 'Observaciones adicionales sobre la adherencia' })
  @IsOptional()
  @IsString()
  observaciones?: string;
}
