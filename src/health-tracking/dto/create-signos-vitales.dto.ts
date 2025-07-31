import { IsUUID, IsString, IsNumber } from 'class-validator';

export class CreateSignosVitalesDto {
  @IsUUID()
  pacienteId: string;

  @IsString()
  tipo: string;

  @IsNumber()
  valor: number;

  @IsString()
  unidad: string;
}
