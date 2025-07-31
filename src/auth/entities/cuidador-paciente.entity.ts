import { BaseUuIDEntity } from 'common/entities/BaseUuID.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Cuidador } from './cuidador.entity';
import { Paciente } from './paciente.entity';

@Entity()
export class CuidadorPaciente extends BaseUuIDEntity {
  @ManyToOne(() => Cuidador, (cuidador) => cuidador.cuidador_pacientes, {
    onDelete: 'CASCADE',
  })
  cuidador: Cuidador;

  @ManyToOne(() => Paciente, (paciente) => paciente.cuidador_pacientes, {
    onDelete: 'CASCADE',
  })
  paciente: Paciente;

  @Column()
  rol: string;

  @Column({ nullable: true })
  observaciones: string;
}
