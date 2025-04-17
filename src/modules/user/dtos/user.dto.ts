import { Expose } from 'class-transformer';
import { BaseUserDto } from './base-user.dto';

export class UserDto extends BaseUserDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
