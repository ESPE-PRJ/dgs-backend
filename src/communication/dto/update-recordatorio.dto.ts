import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordatorioDto } from './create-recordatorio.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRecordatorioDto extends PartialType(CreateRecordatorioDto) {
  @ApiPropertyOptional({
    example: true,
    description: '¿Está activo el recordatorio?',
  })
  activo?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: '¿El recordatorio ha sido completado?',
  })
  completado?: boolean;

  @ApiPropertyOptional({
    example: '2025-08-08T08:00:00.000Z',
    description: 'Nueva fecha de próxima ejecución (opcional)',
  })
  proxima_ejecucion?: string;
}
