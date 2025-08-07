import {
  IsUUID,
  IsString,
  IsInt,
  IsDateString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRecordatorioDto {
  @ApiProperty({
    example: 'e6bbaf4c-98b1-46fd-90d3-2c58c0c2cabc',
    description: 'ID del usuario destinatario (UUID)',
  })
  @IsUUID()
  usuarioId: string;

  @ApiProperty({
    example: 'f14c56ab-324c-4390-86a9-19fc098dcb6f',
    description: 'ID del prescripcion_medicamento (UUID)',
  })
  @IsUUID()
  prescripcionMedicamentoId: string;

  @ApiProperty({
    example: 'Recordatorio de medicación',
    description: 'Título del recordatorio',
  })
  @IsString()
  titulo: string;

  @ApiProperty({
    example: 'Tomar la medicina a las 8 AM',
    description: 'Descripción del recordatorio',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    example: 1,
    description: 'Intervalo de días entre recordatorios',
  })
  @IsInt()
  intervalo_dias: number;

  @ApiProperty({
    example: '08:00:00',
    description: 'Hora del recordatorio (HH:mm:ss)',
  })
  @IsString()
  hora_recordatorio: string;

  @ApiProperty({
    example: '2025-08-07',
    description: 'Fecha de inicio del recordatorio (YYYY-MM-DD)',
  })
  @IsDateString()
  fecha_inicio: string;

  @ApiPropertyOptional({
    example: '2025-09-07',
    description: 'Fecha de fin del recordatorio (YYYY-MM-DD, opcional)',
  })
  @IsOptional()
  @IsDateString()
  fecha_fin?: string;

  @ApiPropertyOptional({
    example: true,
    description: '¿Está activo el recordatorio?',
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: '¿El recordatorio está completado?',
  })
  @IsOptional()
  @IsBoolean()
  completado?: boolean;

  @ApiPropertyOptional({
    example: '2025-08-07T08:00:00.000Z',
    description: 'Fecha y hora de la última ejecución (opcional)',
  })
  @IsOptional()
  @IsDateString()
  ultima_ejecucion?: string;

  @ApiPropertyOptional({
    example: '2025-08-08T08:00:00.000Z',
    description: 'Fecha y hora de la próxima ejecución (opcional)',
  })
  @IsOptional()
  @IsDateString()
  proxima_ejecucion?: string;
}
