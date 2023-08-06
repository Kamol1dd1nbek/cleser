import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookingDto {
    @ApiProperty({ example: 1, description: "| Employer id" })
    @IsNotEmpty()
    @IsNumber()
    employer_id: number;

    @ApiProperty({ example: 2, description: "| Worker id" })
    @IsNotEmpty()
    @IsNumber()
    worker_id: number;

    @ApiProperty({ example: "2023.07.01", description: "| Begin work time" })
    @IsNotEmpty()
    @IsDateString()
    begin_time: Date;

    @ApiProperty({ example: "2023.07.02", description: "| End work time" })
    @IsNotEmpty()
    @IsDateString()
    end_time: Date;

    @ApiProperty({ example: 2, description: "| Status id" })
    @IsNotEmpty()
    @IsNumber()
    status_id: number;

    @ApiProperty({ example: 150000, description: "| Amount from employer" })
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ example: 1, description: "| Worker's service id" })
    worker_service_id: number;
}