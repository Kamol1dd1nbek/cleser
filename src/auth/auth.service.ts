import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/models/user.model';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../role/role.service';
import { RegistrationUserDto } from '../user/dto/registration-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly roleService: RoleService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  //SIGNUP
  
  async signUp(registrationUserDto: RegistrationUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: { email: registrationUserDto.email },
    }); 

    if (user) {
      throw new BadRequestException('This user is already registered');
    }

    if (registrationUserDto.password !== registrationUserDto.confirm_password) {
      throw new BadRequestException('Passwords did not match');
    }
    
    const hashed_password = await bcrypt.hash(registrationUserDto.password, 10);

    const newUser = await this.userRepo.create({
      ...registrationUserDto,
      hashed_password,
    });

    const role = await this.roleService.findOneRoleByName(
      registrationUserDto.role.toUpperCase(),
    );

    if (!role) {
      throw new BadRequestException('Role not found');
    }

    await newUser.$add('roles', [role.id]);

    const tokens = await this.getTokens(newUser);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);
    const activation_link = uuid.v4();

    const updatedUser = await this.userRepo.update(
      {
        hashed_refresh_token,
        activation_link,
      },
      {
        where: { id: newUser.id },
        returning: true,
      },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendUserConfirmation(updatedUser[1][0]);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something went wrong!');
    }

    const response = {
      message: 'User registered',
      user: updatedUser[1][0],
      tokens,
    }; 
    return response
    throw new BadRequestException(response);
  }

  //Tokens Generator

  async getTokens(user: User) {
    const jwtPayload = {
      id: user.id,
      is_active: user.is_active,
      roles: user.roles,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(jwtPayload, {
        expiresIn: process.env.ACCESS_TOKEN_TIME,
        secret: process.env.ACCESS_TOKEN_KEY,
      }),
      this.jwtService.sign(jwtPayload, {
        expiresIn: process.env.REFRESH_TOKEN_TIME,
        secret: process.env.REFRESH_TOKEN_KEY,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
}
