import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/registration-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { ApiOperation } from '@nestjs/swagger';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userRepo: typeof User) {}

  @ApiOperation({ summary: "| Find all users" })
  async findAllUsers() {
    const users = await this.userRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
