import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CustomException } from 'src/common/exceptions/custom-exception';
import { LOGIN_ERROR_CODES } from 'src/constants/errors/login-error-codes';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../user/dtos/user.dto';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

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

    const accessToken = this.generateJwtAccessToken({ id: user.id });
    const refreshToken = this.generateJwtRefreshToken({ id: user.id });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
