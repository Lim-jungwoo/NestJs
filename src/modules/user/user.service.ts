import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { CustomException } from 'src/common/exceptions/custom-exception';
import { LOGIN_ERROR_CODES } from 'src/constants/errors/login-error-codes';
import { toDto } from 'src/common/utils/entity-to-dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { USER_SELECT_FILEDS } from './selects/user.select';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // ========== 🔍 조회 (Read) ==========
  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepo.find();
    return users.map((user) => toDto(UserDto, user));
  }

  async findMe(userId: number): Promise<UserDto> {
    const user = await this.userRepo.findOneBy({ id: userId });
    return toDto(UserDto, user);
  }

  async findOneById(userId: number): Promise<UserDto> {
    const user = await this.userRepo.findOneBy({ id: userId });
    return toDto(UserDto, user);
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepo.findOneBy({ email });
    return toDto(UserDto, user);
  }

  async findOneByNickname(nickname: string): Promise<UserDto> {
    const user = await this.userRepo.findOneBy({ nickname });
    return toDto(UserDto, user);
  }

  async getOneById(userId: number): Promise<UserDto> {
    const user = await this.findOneById(userId);
    if (!user)
      throw new CustomException(
        LOGIN_ERROR_CODES.USER_ID_NOT_FOUND.code,
        HttpStatus.NOT_FOUND,
      );
    return toDto(UserDto, user);
  }

  async getAll(): Promise<UserDto[]> {
    const users = await this.findAll();
    if (!users || users.length === 0)
      throw new CustomException(
        LOGIN_ERROR_CODES.USER_NOT_FOUND.code,
        HttpStatus.NOT_FOUND,
      );
    return users.map((user) => toDto(UserDto, user));
  }

  async getMe(userId: number): Promise<UserDto> {
    const user = await this.findMe(userId);
    if (!user)
      throw new CustomException(
        LOGIN_ERROR_CODES.USER_ID_NOT_FOUND.code,
        HttpStatus.NOT_FOUND,
      );
    return toDto(UserDto, user);
  }

  async getOneByEmail(email: string): Promise<UserDto> {
    const user = await this.findOneByEmail(email);
    if (!user)
      throw new CustomException(
        LOGIN_ERROR_CODES.USER_EMAIL_NOT_FOUND.code,
        HttpStatus.NOT_FOUND,
      );
    return toDto(UserDto, user);
  }

  async getOneByNickname(nickname: string): Promise<UserDto> {
    const user = await this.findOneByNickname(nickname);
    if (!user)
      throw new CustomException(
        LOGIN_ERROR_CODES.USER_NICKNAME_NOT_FOUND.code,
        HttpStatus.NOT_FOUND,
      );
    return toDto(UserDto, user);
  }

  // ========== 🔐 인증용 (로그인 시 사용) ==========
  async findOneWithPasswordByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
      select: USER_SELECT_FILEDS,
    });
  }

  async getOneWithPasswordByEmail(email: string): Promise<User> {
    const user = await this.findOneWithPasswordByEmail(email);
    if (!user) {
      throw new CustomException(
        LOGIN_ERROR_CODES.USER_EMAIL_NOT_FOUND.code,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  // ========== 🆕 생성 (Create) ==========
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const [loginIdExists, emailExists, nicknameExists] = await Promise.all([
      this.existsByLoginId(createUserDto.loginId),
      this.existsByEmail(createUserDto.email),
      this.existsByNickname(createUserDto.nickname),
    ]);

    if (loginIdExists) {
      throw new CustomException(
        LOGIN_ERROR_CODES.USER_LOGIN_ID_ALREADY_EXISTS.code,
        HttpStatus.CONFLICT,
      );
    }

    if (emailExists) {
      throw new CustomException(
        LOGIN_ERROR_CODES.USER_EMAIL_ALREADY_EXISTS.code,
        HttpStatus.CONFLICT,
      );
    }

    if (nicknameExists) {
      throw new CustomException(
        LOGIN_ERROR_CODES.USER_NICKNAME_ALREADY_EXISTS.code,
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepo.create({
      loginId: createUserDto.loginId,
      email: createUserDto.email,
      password: hashedPassword,
      nickname: createUserDto.nickname,
    });

    await this.userRepo.save(user);
    return toDto(UserDto, user);
  }

  // ========== ✏️ 수정 (Update) ==========
  async update(userId: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.getOneById(userId);

    if (updateUserDto.nickname) {
      user.nickname = updateUserDto.nickname;
    }

    await this.userRepo.save(user);
    return toDto(UserDto, user);
  }

  async updateMe(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.getOneById(userId);
    if (updateUserDto.nickname) {
      user.nickname = updateUserDto.nickname;
    }

    await this.userRepo.save(user);
    return toDto(UserDto, user);
  }

  async updatePassword(userId: number, password): Promise<UserDto> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: USER_SELECT_FILEDS,
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await this.userRepo.save(user);
    return toDto(UserDto, user);
  }

  // ========== ❌ 삭제 (Delete) ==========
  async delete(userId: number) {
    const user = await this.getOneById(userId);

    await this.userRepo.softDelete(user);
  }

  async deleteMe(userId: number) {
    const user = await this.getOneById(userId);

    await this.userRepo.softDelete(user);
  }

  // ========== ♻️ 복구 (Restore) ==========
  async restore(userId: number): Promise<UserDto> {
    const result = await this.userRepo.restore(userId);
    if (result.affected === 0) {
      throw new CustomException(
        LOGIN_ERROR_CODES.USER_ID_NOT_FOUND.code,
        HttpStatus.NOT_FOUND,
      );
    }

    const restoredUser = await this.userRepo.findOneBy({ id: userId });
    return toDto(UserDto, restoredUser);
  }

  async restoreMe(userId: number): Promise<UserDto> {
    const result = await this.userRepo.restore(userId);
    if (result.affected === 0) {
      throw new CustomException(
        LOGIN_ERROR_CODES.USER_ID_NOT_FOUND.code,
        HttpStatus.NOT_FOUND,
      );
    }

    const restoredUser = await this.userRepo.findOneBy({ id: userId });
    return toDto(UserDto, restoredUser);
  }

  // ========== ✅ 존재 여부 확인 (Exists) ==========
  async existsById(userId: number): Promise<boolean> {
    const user = await this.userRepo.findOneBy({ id: userId });
    return !!user;
  }

  async existsByLoginId(loginId: string): Promise<boolean> {
    const user = await this.userRepo.findOneBy({ loginId });
    return !!user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.userRepo.findOneBy({ email });
    return !!user;
  }

  async existsByNickname(nickname: string): Promise<boolean> {
    const user = await this.userRepo.findOneBy({ nickname });
    return !!user;
  }

  // ========== 🧪 검증 (Validation) ==========

  // ========== 📦 기타 유틸성 기능 (Utils) ==========
}
