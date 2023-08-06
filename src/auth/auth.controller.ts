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
import { SigninUserDto } from '../user/dto/signin-user.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "| SignUp" })
  @Post('signup')
  signup(
    @Body() registrationUserDto: RegistrationUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUp(registrationUserDto, res);
  }

  @ApiOperation({ summary: "| SignIn" })
  @Post('signin')
  signin(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signinUserDto, res);
  }

  @ApiOperation({ summary: "| SignOut" })
  @Post('signout')
  async signOut(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @ApiOperation({ summary: "| Activation" })
  @ApiResponse({status: 200})
  @Get("activate/:id")
  activation(
    @Param("id") id: string
  ) {
    return this.authService.activation(id);
  }
}
