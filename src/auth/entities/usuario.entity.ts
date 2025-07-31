import { BaseUuIDEntity } from 'common/entities/BaseUuID.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { GeneroEnum } from 'common/enums/GeneroEnum';
import { Notificacion } from 'src/communication/entities/notificacion.entity';
import { Mensaje } from 'src/communication/entities/mensajes.entity';
import { Recordatorio } from 'src/communication/entities/recordatorios.entity';

@Entity()
export class Usuario extends BaseUuIDEntity {
  @Column({ unique: true, length: 200 })
  email: string;

  @Column()
  password: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  fecha_nacimiento: Date;

  @Column({ length: 20 })
  telefono: string;

  @Column({ type: 'enum', enum: GeneroEnum })
  genero: GeneroEnum;

  @Column({ default: true })
  activo: boolean;

  @ManyToOne(() => Role, (role) => role.usuarios)
  role: Role;

  @OneToMany(() => Notificacion, (notificacion) => notificacion.usuario)
  notificaciones: Notificacion[];

  @OneToMany(() => Mensaje, (mensaje) => mensaje.remitente)
  mensajes_enviados: Mensaje[];

  @OneToMany(() => Mensaje, (mensaje) => mensaje.destinatario)
  mensajes_recibidos: Mensaje[];

  @OneToMany(() => Recordatorio, (recordatorio) => recordatorio.usuario)
  recordatorios: Recordatorio[];
}
