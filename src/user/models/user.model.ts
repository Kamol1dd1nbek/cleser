import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { Role } from "../../role/models/role.model";
import { UserRole } from "./user_role.model";

interface UserAttr {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    hashed_password: string;
    hashed_refresh_token: string;
    is_active: boolean;
}

@Table({ tableName: "user" })
export class User extends Model<User, UserAttr> {

    @ApiProperty({ example: 1, description: "| User: unique id" })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({ example: "Sarvar", description: "| User: firstname" })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    first_name: string;

    @ApiProperty({ example: "Sanjarov", description: "| User: lastname" })
    @Column({
        type: DataType.STRING
    })
    last_name: string;

    @ApiProperty({ example: "sarvar342@example.com", description: "| User: email" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        // unique: true
    })
    email: string;

    @ApiProperty({ example: "+998991257894", description: "| User: phone" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    phone: string;

    @ApiProperty({ example: "12345678", description: "| User: password" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    hashed_password: string;

    @ApiProperty({ example: " refresh token ", description: "| User: refresh token" })
    @Column({
        type: DataType.STRING
    })
    hashed_refresh_token: string;

    @ApiProperty({ example: " false ", description: "| User: is_active" })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean;

    @ApiProperty({ example: " link ", description: "| User: activation link" })
    @Column({
        type: DataType.STRING
    })
    activation_link: string;

    @BelongsToMany(()=> Role, () => UserRole)
    roles: [Role]
}
