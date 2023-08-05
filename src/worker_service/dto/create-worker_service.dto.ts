import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateWorkerServiceDto {
    @ApiProperty({ example: 1, description: "| User id" })
    @IsNotEmpty()
    @IsNumber()
    worker_id: number;

    @ApiProperty({ example: 1, description: "| Service id" })
    @IsNotEmpty()
    @IsNumber()
    service_id: number;

    @ApiProperty({ example: 10000, description: "| Worker amount" })
    @IsNotEmpty()
    @IsNumber()
    worker_amount: number;
}