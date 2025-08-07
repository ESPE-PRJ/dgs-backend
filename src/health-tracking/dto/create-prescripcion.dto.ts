import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePrescripcionDto {
  @ApiProperty({ example: 'f46c0a2a-3c8c-4f0b-9f9e-cc8b95b0d43d', description: 'ID del paciente (UUID)' })
  @IsUUID()
  pacienteId: string;

  @ApiProperty({ example: '36e3fcbc-81e8-4c02-81e2-d7c34a1e3c5f', description: 'ID del profesional de salud (UUID)' })
  @IsUUID()
  profesionalSaludId: string;

  @ApiProperty({ example: 'Dolor de cabeza persistente', description: 'Motivo de la prescripción' })
  @IsString()
  motivo: string;

  @ApiProperty({ example: 'Tomar cada 8 horas durante 5 días', description: 'Instrucciones para el paciente' })
  @IsString()
  instrucciones: string;

  @ApiPropertyOptional({ example: true, description: 'Indica si la prescripción está vigente (opcional)' })
  @IsBoolean()
  @IsOptional()
  vigente?: boolean;
}
