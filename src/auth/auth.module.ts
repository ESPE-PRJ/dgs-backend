import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// ENTIDADES
import { Usuario } from './entities/usuario.entity';
import { Role } from './entities/role.entity';
import { Paciente } from './entities/paciente.entity';
import { Cuidador } from './entities/cuidador.entity';
import { ProfesionalSalud } from './entities/profesional-salud.entity';

// JWT STRATEGY Y GUARD
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Role,
      Paciente,
      Cuidador,
      ProfesionalSalud,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
