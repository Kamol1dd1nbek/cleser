import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SigninUserDto {
    @ApiProperty({ example: "qwert@example.com", description: "| User: email" })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "1234qwer", description: "| User: password"})
    @IsString()
    @IsStrongPassword()
    password: string;
}