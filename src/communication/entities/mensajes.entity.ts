import { BaseUuIDEntity } from 'common/entities/BaseUuID.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Mensaje extends BaseUuIDEntity {
  @ManyToOne(() => Usuario, (usuario) => usuario.mensajes_enviados, {
    nullable: false,
  })
  remitente: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.mensajes_recibidos, {
    nullable: false,
  })
  destinatario: Usuario;

  @Column({ type: 'text' })
  contenido: string;

  @Column({ default: false })
  leido: boolean;

  @Column({ nullable: true })
  fecha_lectura: Date;
}
