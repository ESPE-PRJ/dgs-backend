import { BaseUuIDEntity } from 'common/entities/BaseUuID.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Notificacion extends BaseUuIDEntity {
  @ManyToOne(() => Usuario, (usuario) => usuario.notificaciones)
  usuario: Usuario;

  @Column()
  titulo: string;

  @Column()
  mensaje: string;

  @Column()
  tipo: string;

  @Column()
  prioridad: string;

  @Column()
  leido: boolean;
}
