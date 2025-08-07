import { BaseUuIDEntity } from 'common/entities/BaseUuID.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Role extends BaseUuIDEntity {
  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Usuario, (user) => user.role)
  usuarios: Usuario[];
}
