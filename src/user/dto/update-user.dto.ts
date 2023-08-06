import { PartialType } from '@nestjs/swagger';
import { RegistrationUserDto } from './registration-user.dto';

export class UpdateUserDto extends PartialType(RegistrationUserDto) {}
