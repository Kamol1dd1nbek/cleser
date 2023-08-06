import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../role/models/role.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userRepo: typeof User) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepo.findAll({ include: { all: true } });

    if (users.length == 0) {
      throw new BadRequestException('No users have been added yet');
    }

    return users;
  }

  async findOneUser(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id },include: { all: true } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    
    if (updateUserDto.password) {
      const hashed_password = await bcrypt.hash(updateUserDto.password, 10);
      const updatedUser = await this.userRepo.update({...updateUserDto, hashed_password}, { where: { id }, returning: true });
      if ( updatedUser[0] == 0 ) throw new BadRequestException("User not found");
      else return updatedUser[1][0].dataValues;
    } else {
      const updatedUser = await this.userRepo.update(updateUserDto, { where: { id }, returning: true });
      if ( updatedUser[0] == 0 ) throw new BadRequestException("User not found");
      else return updatedUser[1][0].dataValues;
    }
  }

  async remove(id: number) {
    const isDeleted = await this.userRepo.destroy({ where: { id } });

    if (isDeleted) {
      return {
        message: "Successfully deleted",
        status: 200
      }
    } else {
      throw new BadRequestException(`User not found with id: ${id}`)
    }
  }
}
