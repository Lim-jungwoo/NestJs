import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  loginId: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
