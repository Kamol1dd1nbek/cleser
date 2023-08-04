import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({ example: 'start', description: '| Name of status' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 'Means the process has started',
    description: '| About the status',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}