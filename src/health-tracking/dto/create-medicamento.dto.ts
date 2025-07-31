import { IsString, Length } from 'class-validator';

export class CreateMedicamentoDto {
  @IsString()
  @Length(1, 20)
  codigo: string;

  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsString()
  @Length(1, 50)
  forma_farmaceutica: string;

  @IsString()
  @Length(1, 50)
  concentracion: string;

  @IsString()
  @Length(1, 100)
  laboratorio: string;

  @IsString()
  @Length(0, 100)
  observaciones: string;
}
