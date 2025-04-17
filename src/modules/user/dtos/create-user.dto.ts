import { BaseUserDto } from './base-user.dto';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto extends BaseUserDto {
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @MaxLength(32, { message: '비밀번호는 최대 32자까지 가능합니다.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/, {
    message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
  })
  password: string;
}
