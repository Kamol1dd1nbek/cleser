import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Op } from 'sequelize';
import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryRepo: typeof Category
  ) {}

  // ADD CATEGORY

  async addCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const isHave = await this.categoryRepo.findOne({ where: { name: createCategoryDto.name } });

    if ( isHave ) {
      throw new BadRequestException("This role has been added before");
    }

    const reName = createCategoryDto.name.toUpperCase();

    const newCategory = await this.categoryRepo.create({...createCategoryDto, name: reName});

    return newCategory;
  }

  // FIND ALL CATEGORYES

  async findAllCategoryes(): Promise<Category[]> {
    const rolees = await this.categoryRepo.findAll({ include: { all: true } });

    if ( rolees.length === 0 ) {
      throw new NotFoundException("Categoryies have not been added yet!");
    }

    return rolees;
  }

  // FIND ONE CATEGORY BY ID

  async findOneCategoryById(id: number): Promise<Category> {
    const role = await this.categoryRepo.findOne({ where: { id }, include: { all: true } });    

    if ( !role ) {
      throw new NotFoundException(`Category not found with this id: ${id}`);
    }

    return role;
  }

  // UPDATE CATEGORY

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const updatedCategory = await this.categoryRepo.update( { ...updateCategoryDto }, { where: { id }, returning: true } );

    if ( updatedCategory[0] == 0 ) {
      throw new NotFoundException(`Category not found with this id: ${id}`);
    }

    return updatedCategory[1][0].dataValues;
  }

  // REMOVE CATEGORY

  async removeCategory(id: number): Promise<Object> {
    const removedCategory = await this.categoryRepo.destroy( { where: { id }} );

    if ( removedCategory == 0 ) {
      throw new NotFoundException(`Category not found with this id: ${id}`);
    }

    return {
      message: `Category on id ${id} has been deleted successfully`
    };
  }
}