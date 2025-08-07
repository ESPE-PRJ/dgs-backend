import { IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificacionDto {
  @ApiProperty({
    example: 'f3bb8e32-874a-4d5f-91c4-7f5f8e431e0e',
    description: 'ID del usuario destinatario (UUID)',
  })
  @IsUUID()
  usuarioId: string;

  @ApiProperty({
    example: 'Alerta de adherencia',
    description: 'Título de la notificación',
  })
  @IsString()
  titulo: string;

  @ApiProperty({
    example: 'El paciente no confirmó la toma programada',
    description: 'Mensaje de la notificación',
  })
  @IsString()
  mensaje: string;

  @ApiProperty({
    example: 'ALERTA_ADHERENCIA',
    description: 'Tipo de notificación (ALERTA_ADHERENCIA, RECORDATORIO, etc.)',
  })
  @IsString()
  tipo: string;

  @ApiProperty({
    example: 'alta',
    description: 'Prioridad de la notificación (alta, media, baja)',
  })
  @IsString()
  prioridad: string;

  @ApiProperty({
    example: false,
    description: '¿La notificación ha sido leída?',
  })
  @IsOptional()
  leido?: boolean;
}
