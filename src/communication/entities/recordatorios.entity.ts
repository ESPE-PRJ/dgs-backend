import { BaseUuIDEntity } from 'common/entities/BaseUuID.entity';
import { PrescripcionMedicamento } from 'src/health-tracking/entities/prescripcion-medicamento.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { RegistroAdherencia } from 'src/health-tracking/entities/registro-adherencia.entity';

@Entity()
export class Recordatorio extends BaseUuIDEntity {
  @ManyToOne(() => Usuario, (usuario) => usuario.recordatorios, {
    nullable: false,
  })
  usuario: Usuario;

  @ManyToOne(
    () => PrescripcionMedicamento,
    (prescripcionMedicamento) => prescripcionMedicamento.recordatorios,
    { nullable: false },
  )
  prescripcion_medicamento: PrescripcionMedicamento;

  @Column()
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'int', default: 1 })
  intervalo_dias: number;

  @Column({ type: 'time' })
  hora_recordatorio: string;

  @Column({ type: 'date' })
  fecha_inicio: Date;

  @Column({ type: 'date', nullable: true })
  fecha_fin: Date;

  @Column({ default: true })
  activo: boolean;

  @Column({ default: false })
  completado: boolean;

  @Column({ type: 'timestamp', nullable: true })
  ultima_ejecucion: Date;

  @Column({ type: 'timestamp', nullable: true })
  proxima_ejecucion: Date;

  @OneToMany(
    () => RegistroAdherencia,
    (registroAdherencia) => registroAdherencia.recordatorio,
  )
  registro_adherencia: RegistroAdherencia[];
}
