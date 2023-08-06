import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/JwtAuth.guard';

@ApiTags("Categories")
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: "| Add new category" })
  @UseGuards(JwtAuthGuard)
  @Post()
  addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.addCategory(createCategoryDto);
  }

  @ApiOperation({ summary: "| Find all categories" })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAllCategoryes() {
    return this.categoryService.findAllCategoryes();
  }

  @ApiOperation({ summary: "| Find category by id" })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneCategoryById(@Param('id') id: string) {
    return this.categoryService.findOneCategoryById(+id);
  }

  @ApiOperation({ summary: "| Update category" })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: "| Delete category" })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeCategory(@Param('id') id: string) {
    return this.categoryService.removeCategory(+id);
  }
}
