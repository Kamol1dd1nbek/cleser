import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "./user.model";
import { Role } from "../../role/models/role.model";

interface UserRoleAttr {
    user_id: number;
    role_id: number;
}

@Table({ tableName: "user_role" })
export class UserRole extends Model<UserRole, UserRoleAttr> {

    @ApiProperty({ example: 1, description: "| User id" })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id: number;

    @ApiProperty({ example: 1, description: "| Role id" })
    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    role_id: number;
}