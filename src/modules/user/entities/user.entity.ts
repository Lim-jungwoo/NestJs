import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  loginId: string;

  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  nickname: string;
}
