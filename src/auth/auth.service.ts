import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/models/user.model';
import { CreateUserDto } from '../user/dto/registration-user.dto';
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly mailService: MailService) {}

  //SIGNUP

  async signUp(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({ where: { email: createUserDto.email } });

    if ( user ) {
      throw new BadRequestException("This user is already registered");
    }

    if ( createUserDto.password !== createUserDto.confirm_password ) {
      throw new BadRequestException("Passwords did not match");
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 10);
    
    const newUser = await this.userRepo.create({ ...createUserDto, hashed_password });

  }

  async getTokens(user: User) {
    
  }

}
