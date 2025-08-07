import { BaseUuIDEntity } from 'common/entities/BaseUuID.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Recordatorio } from 'src/communication/entities/recordatorios.entity';
import { Paciente } from 'src/auth/entities/paciente.entity';

@Entity()
export class RegistroAdherencia extends BaseUuIDEntity {
  @ManyToOne(
    () => Recordatorio,
    (recordatorio) => recordatorio.registro_adherencia,
    {
      nullable: false,
    },
  )
  recordatorio: Recordatorio;

  @ManyToOne(() => Paciente, (paciente) => paciente.registro_adherencia, {
    nullable: false,
  })
  paciente: Paciente;

  @Column({ default: false })
  suministrado: boolean;

  @Column({ type: 'timestamp', nullable: true })
  fecha_suministro: Date;

  @Column({ type: 'text', nullable: true })
  observaciones: string;
}
