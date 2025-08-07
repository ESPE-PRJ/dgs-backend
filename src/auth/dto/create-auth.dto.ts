import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GeneroEnum } from 'common/enums/GeneroEnum';

export class CreateAuthDto {
  @ApiProperty({ example: 'correo@correo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'supersecreto123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Juan' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Perez' })
  @IsString()
  apellido: string;

  @ApiProperty({ example: '1999-05-01' })
  @IsString()
  fecha_nacimiento: string;

  @ApiProperty({ example: '0988888888' })
  @IsString()
  telefono: string;

  @ApiProperty({ enum: GeneroEnum, example: GeneroEnum.MASCULINO })
  @IsEnum(GeneroEnum)
  genero: GeneroEnum;

  @ApiProperty({ example: 'PACIENTE' })
  @IsString()
  role: string; // "PACIENTE", "CUIDADOR", "PROFESIONAL"
}
