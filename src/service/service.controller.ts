import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServiceService } from './service.service';
import { Service } from './models/service.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../guards/JwtAuth.guard';

@ApiTags("Services")
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiOperation({ summary: "| Add new service" })
  @ApiResponse({ status: 201, type: Service })
  @UseGuards(JwtAuthGuard)
  @Post()
  addService(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.addService(createServiceDto);
  }

  @ApiOperation({ summary: "| Find all servicees" })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAllServicees() {
    return this.serviceService.findAllServicees();
  }

  @ApiOperation({ summary: "| Find service with name" })
  @UseGuards(JwtAuthGuard)
  @Get('name/:name')
  findOneServiceByName(@Param('name') name: string) {
    return this.serviceService.findOneServiceByName(name);
  }

  @ApiOperation({ summary: "| Find service with id" })
  @UseGuards(JwtAuthGuard)
  @Get('id/:idd')
  findOneServiceById(@Param('idd') idd: string) {
    return this.serviceService.findOneServiceById(+idd);
  }

  @ApiOperation({ summary: "| Update Service" })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateService(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.updateService(+id, updateServiceDto);
  }

  @ApiOperation({ summary: "| Delete service" })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeService(@Param('id') id: string) {
    return this.serviceService.removeService(+id);
  }
}