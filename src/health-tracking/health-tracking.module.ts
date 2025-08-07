import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthTrackingService } from './health-tracking.service';
import { HealthTrackingController } from './health-tracking.controller';

// ...otras importaciones de entidades
import { Medicamento } from './entities/medicamento.entity';
import { Prescripcion } from './entities/prescripcion.entity';
import { PrescripcionMedicamento } from './entities/prescripcion-medicamento.entity';
import { RegistroAdherencia } from './entities/registro-adherencia.entity';
import { SignosVitales } from './entities/signos-vitales.entity';

// Importa la entidad de auth
import { CuidadorPaciente } from 'src/auth/entities/cuidador-paciente.entity';

// Importa la entidad de notificación desde communication
import { Notificacion } from 'src/communication/entities/notificacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Medicamento,
      Prescripcion,
      PrescripcionMedicamento,
      RegistroAdherencia,
      SignosVitales,
      CuidadorPaciente,
      Notificacion
    ]),
  ],
  controllers: [HealthTrackingController],
  providers: [HealthTrackingService],
  exports: [HealthTrackingService],
})
export class HealthTrackingModule {}
