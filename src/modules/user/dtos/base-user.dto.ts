import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class BaseUserDto {
  @Expose()
  @IsString()
  loginId: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  nickname: string;
}
