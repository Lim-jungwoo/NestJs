import { User } from '../entities/user.entity';

export const USER_SELECT_FILEDS: (keyof User)[] = [
  'id',
  'createdAt',
  'updatedAt',
  'loginId',
  'email',
  'password',
  'nickname',
];
