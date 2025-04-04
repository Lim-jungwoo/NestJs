import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class BaseUserDto {
  @Expose()
  id: number;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  nickname: string;
}
