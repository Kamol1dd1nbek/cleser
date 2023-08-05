import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, DataType, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";

interface CategoryAttr {
    name: string;
    description: string;
    parent_id: number;
}

@Table({ tableName: "category", createdAt: false, updatedAt: false })
export class Category extends Model<Category, CategoryAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({ example: 1, description: '| Parent id of category' })
    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: null
    })
    parent_id: number;

    @ApiProperty({ example: "WORKER", description: "| Name of role" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    name: string;

    @ApiProperty({ example: "WORKER: Looking for work", description: "| About the role" })
    @Column({
        type: DataType.STRING
    })
    description: string;

    @BelongsTo(() => Category)
    parent: Category;
}