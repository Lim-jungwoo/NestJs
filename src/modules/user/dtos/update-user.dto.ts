import { OmitType, PartialType } from '@nestjs/mapped-types';
import { BaseUserDto } from './base-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(BaseUserDto, ['loginId', 'email'] as const),
) {}
