import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CustomException } from 'src/common/exceptions/custom-exception';
import { LOGIN_ERROR_CODES } from 'src/common/errors/login-error-codes';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  // 임시 데이터 저장
  signUpData: SignUpDto[] = [];

  generateJwtAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE'),
    });
  }

  generateJwtRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    });
  }

  async signUp(signUpDto: SignUpDto) {
    const existingIds = new Set(
      this.signUpData.map((signUpData) => signUpData.id),
    );

    if (existingIds.has(signUpDto.id)) {
      throw new CustomException(LOGIN_ERROR_CODES.USER_ID_ALREADY_EXISTS.code);
    }

    this.signUpData.push(signUpDto);

    return 'OK';
  }

  async signIn(signInDto: SignInDto) {
    const userMap = new Map(
      this.signUpData.map((user) => [user.id, user.password]),
    );

    if (userMap.has(signInDto.id)) {
      const storedPassword = userMap.get(signInDto.id);

      if (storedPassword !== signInDto.password) {
        throw new CustomException(LOGIN_ERROR_CODES.INVALID_PASSWORD.code);
      }

      const accessToken = this.generateJwtAccessToken({ sub: signInDto.id });
      const refreshToken = this.generateJwtRefreshToken({ sub: signInDto.id });

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    }

    throw new CustomException(LOGIN_ERROR_CODES.USER_ID_NOT_FOUND.code);
  }
}
