import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../../user/models/user.model";
import { Service } from "../../service/models/service.model";

interface WorkerServiceAttr {
    name: string;
    description: string;
    parent_id: number;
}

@Table({ tableName: "worker_service", createdAt: false, updatedAt: false })
export class WorkerService extends Model <WorkerService, WorkerServiceAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({ example: 1, description: "| User id" })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    worker_id: number;

    @ApiProperty({ example: 1, description: "| Service id" })
    @ForeignKey(() => Service)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    service_id: number;

    @ApiProperty({ example: 10000, description: "| Worker amount" })
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    worker_amount: number;
}