import { Injectable } from '@nestjs/common';
import { CustomException } from 'src/common/exceptions/custom-exception';
import { LOGIN_ERROR_CODES } from 'src/constants/errors/login-error-codes';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../user/dtos/user.dto';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import { JwtProvider } from './jwt/jwt.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtProvider: JwtProvider,
  ) {}

  async signUp(dto: SignUpDto): Promise<UserDto> {
    const user = await this.userService.create(dto);
    return user;
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.getOneWithPasswordByLoginId(
      signInDto.loginId,
    );

    const storedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      storedPassword,
    );
    if (!isPasswordValid) {
      throw new CustomException(LOGIN_ERROR_CODES.INVALID_PASSWORD.code);
    }

    const accessToken = this.jwtProvider.generateAccessToken({ id: user.id });
    const refreshToken = this.jwtProvider.generateRefreshToken({
      id: user.id,
      tokenVersion: 1,
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
