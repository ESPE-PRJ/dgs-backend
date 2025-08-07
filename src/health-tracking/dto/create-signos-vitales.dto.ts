import { IsUUID, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSignosVitalesDto {
  @ApiProperty({ example: 'e821f1de-0d8b-45ee-b9d6-8f7e264f6f0a', description: 'ID del paciente (UUID)' })
  @IsUUID()
  pacienteId: string;

  @ApiProperty({ example: 'presion_arterial', description: 'Tipo de signo vital (presion_arterial, glucosa, etc.)' })
  @IsString()
  tipo: string;

  @ApiProperty({ example: 120, description: 'Valor del signo vital medido' })
  @IsNumber()
  valor: number;

  @ApiProperty({ example: 'mmHg', description: 'Unidad de medida del signo vital' })
  @IsString()
  unidad: string;
}
