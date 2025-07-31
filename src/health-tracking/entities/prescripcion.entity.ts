import { BaseUuIDEntity } from 'common/entities/BaseUuID.entity';
import { Paciente } from 'src/auth/entities/paciente.entity';
import { ProfesionalSalud } from 'src/auth/entities/profesional-salud.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PrescripcionMedicamento } from './prescripcion-medicamento.entity';

@Entity()
export class Prescripcion extends BaseUuIDEntity {
  @ManyToOne(() => Paciente, (paciente) => paciente.prescripciones)
  paciente: Paciente;

  @ManyToOne(
    () => ProfesionalSalud,
    (profesionalSalud) => profesionalSalud.prescripciones,
  )
  profesional_salud: ProfesionalSalud;

  @Column()
  motivo: string;

  @Column()
  instrucciones: string;

  @Column({ default: true })
  vigente: boolean;

  @OneToMany(
    () => PrescripcionMedicamento,
    (prescripcionMedicamento) => prescripcionMedicamento.prescripcion,
  )
  prescripcion_medicamentos: PrescripcionMedicamento[];
}
