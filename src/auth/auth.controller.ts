import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../types';
import { LoginDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    description: 'Login',
  })
  signIn(
    @Body()
    signInDto: LoginDto,
  ) {
    if (
      ![UserRole.Admin, UserRole.Limited, UserRole.Normal].includes(
        signInDto.role,
      )
    ) {
      throw new HttpException('invalid user role', 400);
    }

    return this.authService.signIn(signInDto.role);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get user info',
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
