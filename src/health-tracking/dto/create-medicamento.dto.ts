import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicamentoDto {
  @ApiProperty({ example: 'MED-001', description: 'Código único del medicamento' })
  @IsString()
  @Length(1, 20)
  codigo: string;

  @ApiProperty({ example: 'Paracetamol', description: 'Nombre del medicamento' })
  @IsString()
  @Length(1, 100)
  nombre: string;

  @ApiProperty({ example: 'Tableta', description: 'Forma farmacéutica (tableta, jarabe, cápsula, etc.)' })
  @IsString()
  @Length(1, 50)
  forma_farmaceutica: string;

  @ApiProperty({ example: '500mg', description: 'Concentración del medicamento' })
  @IsString()
  @Length(1, 50)
  concentracion: string;

  @ApiProperty({ example: 'ACME Labs', description: 'Laboratorio fabricante' })
  @IsString()
  @Length(1, 100)
  laboratorio: string;

  @ApiProperty({ example: 'Tomar después de las comidas', description: 'Observaciones adicionales' })
  @IsString()
  @Length(0, 100)
  observaciones: string;
}
