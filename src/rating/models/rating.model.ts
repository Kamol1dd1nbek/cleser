import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Table, Column, ForeignKey } from "sequelize-typescript";
import { User } from "../../user/models/user.model";

interface RatingAttr {
    user_id: number;
    worker_id: number;
    description: string;
    stars_count: number;
}

@Table({ tableName: "rating" })
export class Rating extends Model<Rating, RatingAttr>{
    @ApiProperty({ example: 1, description: "| Rating unique id" })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({ example: 2, description: "| User id" })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id: number;

    @ApiProperty({ example: 1, description: "| Worker id" })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    worker_id: number;

    @ApiProperty({ example: "Good", description: "| Description to stars count" })
    @Column({
        type: DataType.STRING
    })
    description: string;

    @ApiProperty({ example: 2, description: "| Stars count" })
    @Column({
        type: DataType.INTEGER,
    })
    stars_count: number;
}