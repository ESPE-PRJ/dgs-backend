import { BaseUuIDEntity } from 'common/entities/BaseUuID.entity';
import { Column, Entity, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CuidadorPaciente } from './cuidador-paciente.entity';

@Entity()
export class Cuidador extends BaseUuIDEntity {
  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario: Usuario;

  @Column()
  parentesco: string;

  @OneToMany(
    () => CuidadorPaciente,
    (cuidadorPaciente) => cuidadorPaciente.cuidador,
  )
  cuidador_pacientes: CuidadorPaciente[];
}
