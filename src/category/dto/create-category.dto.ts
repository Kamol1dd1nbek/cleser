import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ example: 1, description: '| Parent id of category' })
    @IsOptional()
    parent_id: number;

    @ApiProperty({ example: 'Home', description: '| Name of category' })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;
  
    @ApiProperty({
      example: '',
      description: '| About the role',
    })

    @IsOptional()
    @IsString()
    description: string;
}