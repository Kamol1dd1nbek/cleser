import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServiceService } from './service.service';
import { Service } from './models/service.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@ApiTags("Services")
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiOperation({ summary: "| Add new service" })
  @ApiResponse({ status: 201, type: Service })
  @Post()
  addService(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.addService(createServiceDto);
  }

  @ApiOperation({ summary: "| Find all servicees" })
  @Get()
  findAllServicees() {
    return this.serviceService.findAllServicees();
  }

  @Get('name/:name')
  @ApiOperation({ summary: "| Find service with name" })
  findOneServiceByName(@Param('name') name: string) {
    return this.serviceService.findOneServiceByName(name);
  }

  @Get('id/:idd')
  @ApiOperation({ summary: "| Find service with id" })
  findOneServiceById(@Param('idd') idd: string) {
    return this.serviceService.findOneServiceById(+idd);
  }

  @ApiOperation({ summary: "| Update Service" })
  @Patch(':id')
  updateService(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.updateService(+id, updateServiceDto);
  }

  @ApiOperation({ summary: "| Delete service" })
  @Delete(':id')
  removeService(@Param('id') id: string) {
    return this.serviceService.removeService(+id);
  }
}