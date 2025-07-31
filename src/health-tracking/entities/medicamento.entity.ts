import { BaseUuIDEntity } from 'common/entities/BaseUuID.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PrescripcionMedicamento } from './prescripcion-medicamento.entity';

@Entity()
export class Medicamento extends BaseUuIDEntity {
  @Column({ unique: true, length: 20 })
  codigo: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  forma_farmaceutica: string;

  @Column({ length: 50 })
  concentracion: string;

  @Column({ length: 100 })
  laboratorio: string;

  @Column({ length: 100 })
  observaciones: string;

  @OneToMany(
    () => PrescripcionMedicamento,
    (prescripcionMedicamento) => prescripcionMedicamento.medicamento,
  )
  prescripcion_medicamentos: PrescripcionMedicamento[];
}
