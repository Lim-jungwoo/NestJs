import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-access.guard';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
@UseGuards(JwtAccessAuthGuard)
export class UserController {
  constructor(readonly userService: UserService) {}

  // ========== 🔍 조회 (Read) ==========
  @Get()
  findAll() {
    return this.userService.getAll();
  }

  @Get('me')
  findMe(@Req() req) {
    return this.userService.getMe(req.user.id);
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.userService.getOneById(id);
  }

  @Get('email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.userService.getOneByEmail(email);
  }

  @Get('nickname/:nickname')
  findOneByNickname(@Param('nickname') nickname: string) {
    return this.userService.getOneByNickname(nickname);
  }

  // ========== ✏️ 수정 (Update) ==========
  @Patch('me')
  updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateMe(req.user.id, updateUserDto);
  }

  // ========== ❌ 삭제 (Delete) ==========
  @Delete('me')
  deleteMe(@Req() req) {
    return this.userService.deleteMe(req.user.id);
  }

  // ========== ♻️ 복구 (Restore) ==========
  @Patch('restore/me')
  restoreMe(@Req() req) {
    return this.userService.restoreMe(req.user.id);
  }
  // ========== 📦 기타 유틸성 기능 (Utils) ==========
}
