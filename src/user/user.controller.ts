import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/JwtAuth.guard';


@ApiTags("Users")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '| Find all users' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @ApiOperation({ summary: "| Find user by id" })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.userService.findOneUser(+id);
  }

  @ApiOperation({ summary: "| Update user" })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "| Delete user" })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
