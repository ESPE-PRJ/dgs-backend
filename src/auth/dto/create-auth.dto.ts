import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { GeneroEnum } from 'common/enums/GeneroEnum';

export class CreateAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  fecha_nacimiento: string;

  @IsString()
  telefono: string;

  @IsEnum(GeneroEnum)
  genero: GeneroEnum;

  @IsString()
  role: string; // "PACIENTE", "CUIDADOR", "PROFESIONAL"
}
