import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import { JwtAccessAuthGuard } from './guards/jwt-access.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('verify-access-token')
  @UseGuards(JwtAccessAuthGuard)
  verifyAccessToken(@Req() req) {
    return { user: req.user };
  }

  @Get('verify-refresh-token')
  @UseGuards(JwtRefreshAuthGuard)
  verifyRefreshToken(@Req() req) {
    return { user: req.user };
  }
}
