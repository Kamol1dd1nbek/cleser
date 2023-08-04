import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, DataType, Model } from "sequelize-typescript";

interface RoleAttr {
    name: string;
    description: string;
}

@Table({ tableName: "role", createdAt: false, updatedAt: false })
export class Role extends Model<Role, RoleAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({ example: "WORKER", description: "| Name of role" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    name: string;

    @ApiProperty({ example: "WORKER: Looking for work", description: "| About the role" })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string;
}