import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRatingDto {
    @ApiProperty({ example: 1, description: "| User: id" })
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @ApiProperty({ example: 2, description: "| Worker: id" })
    @IsNotEmpty()
    @IsNumber()
    worker_id: number;

    @ApiProperty({ example: "Good", description: "| Comment: text" })
    description: string;

    @ApiProperty({ example: "Good", description: "| Stars count" })
    @IsNumber()
    stars_count: number;
}