import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { CustomException } from 'src/common/exceptions/custom-exception';
import { LOGIN_ERROR_CODES } from 'src/common/errors/login-error-codes';
import { toDto } from 'src/common/utils/entity-to-dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findOne(id: number): Promise<UserDto> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user)
      throw new CustomException(
        LOGIN_ERROR_CODES.USER_ID_NOT_FOUND.code,
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepo.findOneBy({ email });
    return user;
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    const exists = await this.findOneByEmail(dto.email);
    if (exists) {
      throw new CustomException(
        LOGIN_ERROR_CODES.USER_EMAIL_ALREADY_EXISTS.code,
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      email: dto.email,
      password: hashedPassword,
      nickname: dto.nickname,
    });

    await this.userRepo.save(user);
    return toDto(UserDto, user);
  }

  async update(dto: UpdateUserDto): Promise<UserDto> {
    const user = await this.findOne(dto.id);

    if (dto.nickname) {
      user.nickname = dto.nickname;
    }

    await this.userRepo.save(user);
    return toDto(UserDto, user);
  }

  async delete(id: number) {
    const user = await this.findOne(id);

    await this.userRepo.softDelete(user);
  }
}
