import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'start', description: '| Name of role' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 'WORKER: Looking for work',
    description: '| About the role',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}