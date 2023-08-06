import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator";

export class RegistrationUserDto {
    @ApiProperty({ example: "Sarvar", description: "| User: firstname" })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    first_name: string;

    @ApiProperty({ example: "Sanjarov", description: "| User: lastname" })
    @IsString()
    @MinLength(3)
    last_name: string;

    @ApiProperty({ example: "sarvar342@example.com", description: "| User: email" })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "+998991257894", description: "| User: phone" })
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @ApiProperty({ example: "12345678", description: "| User: password" })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @ApiProperty({ example: "12345678", description: "| User: confirm password" })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    confirm_password: string;

    @ApiProperty({ example: 1, description: "| Role id" })
    @IsNotEmpty()
    @IsString()
    role: string;
}