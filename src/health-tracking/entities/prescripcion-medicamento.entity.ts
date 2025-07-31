import { BaseUuIDEntity } from 'common/entities/BaseUuID.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Medicamento } from './medicamento.entity';
import { Prescripcion } from './prescripcion.entity';
import { Recordatorio } from 'src/communication/entities/recordatorios.entity';

@Entity()
export class PrescripcionMedicamento extends BaseUuIDEntity {
  @ManyToOne(
    () => Medicamento,
    (medicamento) => medicamento.prescripcion_medicamentos,
  )
  medicamento: Medicamento;

  @ManyToOne(
    () => Prescripcion,
    (prescripcion) => prescripcion.prescripcion_medicamentos,
  )
  prescripcion: Prescripcion;

  @Column()
  dosis: string;

  @Column()
  frecuencia: string;

  @Column()
  via_administracion: string;

  @Column()
  observaciones: string;

  @Column()
  fecha_inicio: Date;

  @Column()
  fecha_fin: Date;

  @OneToMany(
    () => Recordatorio,
    (recordatorio) => recordatorio.prescripcion_medicamento,
  )
  recordatorios: Recordatorio[];
}
