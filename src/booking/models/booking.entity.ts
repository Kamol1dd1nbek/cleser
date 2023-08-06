import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Table, Column, ForeignKey } from "sequelize-typescript";
import { User } from "../../user/models/user.model";
interface BookingAttr {
    employer_id: number;
    worker_id: number;
    begin_time: Date;
    end_time: Date;
    status_id: number;
    amount: number;
    worker_service_id: number;
}

@Table({ tableName: "booking" })
export class Booking extends Model<Booking, BookingAttr> {
    @ApiProperty({ example: 1, description: "| Table id" })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({ example: 1, description: "| Employer id" })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    employer_id: number;

    @ApiProperty({ example: 2, description: "| Worker id" })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    worker_id: number;

    @ApiProperty({ example: "2023.07.01", description: "| Begin work time" })
    @Column({
        type: DataType.DATE
    })
    begin_time: Date;

    @ApiProperty({ example: "2023.07.02", description: "| End work time" })
    @Column({
        type: DataType.DATE
    })
    end_time: Date;

    @ApiProperty({ example: 2, description: "| Status id" })
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    status_id: number;

    @ApiProperty({ example: 200000, description: "| Amount from employer" })
    @Column({
        type: DataType.INTEGER
    })
    amount: number;

    @ApiProperty({ example: 1, description: "| Worker's service id" })
    @Column({
        type: DataType.INTEGER
    })
    worker_service_id: number;
}