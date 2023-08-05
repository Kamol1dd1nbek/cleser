import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Category } from '../../category/models/category.model';

interface ServiceAttr {
  name: string;
  description: string;
  category_id: number;
}

@Table({ tableName: 'service', createdAt: false, updatedAt: false })
export class Service extends Model<Service, ServiceAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Window cleaning', description: '| Name of service' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @ApiProperty({
    example: 'Cleaning the windows of a small apartment',
    description: '| About service',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  description: string;

  @ApiProperty({ example: 1, description: '| Category id of service' })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;
}