import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationUserDto } from '../user/dto/registration-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body() registrationUserDto: RegistrationUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUp(registrationUserDto, res);
  }

  @Post('signin')
  signin(
    @Body() registrationUserDto: RegistrationUserDto,
    @Res() res: Response,
  ) {
    return this.authService.signUp(registrationUserDto, res);
  }
}
