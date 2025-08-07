import { IsUUID, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescripcionMedicamentoDto {
  @ApiProperty({ example: 'b84d98a1-1d63-4eaa-b7e8-34c12b55e7de', description: 'ID de la prescripción (UUID)' })
  @IsUUID()
  prescripcionId: string;

  @ApiProperty({ example: '27c47e99-66c5-4b9e-9a9b-7c1c99a246be', description: 'ID del medicamento (UUID)' })
  @IsUUID()
  medicamentoId: string;

  @ApiProperty({ example: '500mg', description: 'Dosis prescrita para el medicamento' })
  @IsString()
  dosis: string;

  @ApiProperty({ example: 'Cada 8 horas', description: 'Frecuencia de administración' })
  @IsString()
  frecuencia: string;

  @ApiProperty({ example: 'Oral', description: 'Vía de administración (oral, intravenosa, etc.)' })
  @IsString()
  via_administracion: string;

  @ApiProperty({ example: 'Tomar con alimentos', description: 'Observaciones adicionales sobre la administración' })
  @IsString()
  observaciones: string;

  @ApiProperty({ example: '2025-08-07', description: 'Fecha de inicio de la prescripción (YYYY-MM-DD)' })
  @IsDateString()
  fecha_inicio: string;

  @ApiProperty({ example: '2025-08-14', description: 'Fecha de fin de la prescripción (YYYY-MM-DD)' })
  @IsDateString()
  fecha_fin: string;
}
