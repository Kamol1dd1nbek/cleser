import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, DataType, Model } from "sequelize-typescript";

interface StatusAttr {
    name: string;
    description: string;
}

@Table({ tableName: "status", createdAt: false, updatedAt: false })
export class Status extends Model<Status, StatusAttr> {

    @ApiProperty({ example: "start", description: "| Name of status" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    name: string;

    @ApiProperty({ example: "Means the process has started", description: "| About the status" })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string;
}