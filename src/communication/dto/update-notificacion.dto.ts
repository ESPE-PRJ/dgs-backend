import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificacionDto } from './create-notificacion.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNotificacionDto extends PartialType(CreateNotificacionDto) {
  @ApiPropertyOptional({
    example: true,
    description: '¿La notificación ha sido leída?',
  })
  leido?: boolean;
}
