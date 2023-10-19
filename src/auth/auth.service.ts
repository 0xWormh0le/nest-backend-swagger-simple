import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../types';
import { jwtConstants } from './jwtConstants';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signIn(role: UserRole) {
    const payload = { role };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
