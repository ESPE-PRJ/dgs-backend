import { BaseUuIDEntity } from 'common/entities/BaseUuID.entity';
import { Paciente } from 'src/auth/entities/paciente.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class SignosVitales extends BaseUuIDEntity {
  @ManyToOne(() => Paciente, (paciente) => paciente.signos_vitales)
  paciente: Paciente;

  @Column()
  tipo: string;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  valor: number;

  @Column({ length: 10 })
  unidad: string;
}
