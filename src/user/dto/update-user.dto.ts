import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './registration-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
