import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateServiceDto {
    
    @ApiProperty({ example: 'Window cleaning', description: '| Name of service' })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;
    
    @ApiProperty({
        example: 'Cleaning the windows of a small apartment',
        description: '| About the service',
    })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ example: 1, description: '| Category id of service' })
    @IsOptional()
    category_id: number;
}