import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ example: 'ejemplo@correo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'miclaveSegura123' })
  @IsString()
  password: string;
}
