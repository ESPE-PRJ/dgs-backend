import { BaseUuIDEntity } from 'common/entities/BaseUuID.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Prescripcion } from 'src/health-tracking/entities/prescripcion.entity';

@Entity()
export class ProfesionalSalud extends BaseUuIDEntity {
  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario: Usuario;

  @Column()
  numero_licencia: string;

  @Column()
  especialidad: string;

  @Column()
  institucion: string;

  @OneToMany(
    () => Prescripcion,
    (prescripcion) => prescripcion.profesional_salud,
  )

  prescripciones: Prescripcion[];
}
