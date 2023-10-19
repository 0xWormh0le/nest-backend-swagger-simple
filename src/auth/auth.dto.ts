import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../types';

export class LoginDto {
  @ApiProperty({ enum: [UserRole.Admin, UserRole.Normal, UserRole.Limited] })
  role: UserRole;
}
