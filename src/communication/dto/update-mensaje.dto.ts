import { PartialType } from '@nestjs/mapped-types';
import { CreateMensajeDto } from './create-mensaje.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMensajeDto extends PartialType(CreateMensajeDto) {
  @ApiPropertyOptional({
    example: true,
    description: '¿El mensaje ha sido leído?',
  })
  leido?: boolean;

  @ApiPropertyOptional({
    example: '2025-08-07T10:15:00.000Z',
    description: 'Fecha en que se leyó el mensaje',
  })
  fecha_lectura?: Date;
}
