import { IsUUID, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMensajeDto {
  @ApiProperty({
    example: 'de3b1b7f-2d85-4bca-8a3d-4e7a1f96a1f3',
    description: 'ID del remitente (usuario que envía el mensaje)',
  })
  @IsUUID()
  remitenteId: string;

  @ApiProperty({
    example: 'e6bbaf4c-98b1-46fd-90d3-2c58c0c2cabc',
    description: 'ID del destinatario (usuario que recibe el mensaje)',
  })
  @IsUUID()
  destinatarioId: string;

  @ApiProperty({
    example: 'Recuerda tomar tu medicación a las 8 AM.',
    description: 'Contenido del mensaje',
  })
  @IsString()
  contenido: string;
}
