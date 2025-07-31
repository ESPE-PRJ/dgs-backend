import { BaseUuIDEntity } from 'common/entities/BaseUuID.entity';
import { Column, Entity, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CuidadorPaciente } from './cuidador-paciente.entity';
import { SignosVitales } from 'src/health-tracking/entities/signos-vitales.entity';
import { Prescripcion } from 'src/health-tracking/entities/prescripcion.entity';
import { RegistroAdherencia } from 'src/health-tracking/entities/registro-adherencia.entity';

@Entity()
export class Paciente extends BaseUuIDEntity {
  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario: Usuario;

  @Column()
  historial_clinico: string;

  @Column()
  grupo_sanguineo: string;

  @Column()
  direccion: string;

  @OneToMany(
    () => CuidadorPaciente,
    (cuidadorPaciente) => cuidadorPaciente.paciente,
  )
  cuidador_pacientes: CuidadorPaciente[];

  @OneToMany(() => SignosVitales, (signosVitales) => signosVitales.paciente)
  signos_vitales: SignosVitales[];

  @OneToMany(() => Prescripcion, (prescripcion) => prescripcion.paciente)
  prescripciones: Prescripcion[];

  @OneToMany(
    () => RegistroAdherencia,
    (registroAdherencia) => registroAdherencia.paciente,
  )
  registro_adherencia: RegistroAdherencia[];
}
