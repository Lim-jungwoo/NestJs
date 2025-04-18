import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Role } from 'src/modules/permission/entities/role.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Permission extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
