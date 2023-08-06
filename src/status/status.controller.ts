import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Status } from './models/status.model';
import { JwtAuthGuard } from '../guards/JwtAuth.guard';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/RolesAuth.guard';

@ApiTags("Statuses")
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: "| Add new status" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @ApiResponse({ status: 201, type: Status })
  @UseGuards(JwtAuthGuard)
  @Post()
  addStatus(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.addStatus(createStatusDto);
  }

  @ApiOperation({ summary: "| Find all statuses" })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAllStatuses() {
    return this.statusService.findAllStatuses();
  }

  @ApiOperation({ summary: "| Find status with name" })
  @UseGuards(JwtAuthGuard)
  @Get('name/:name')
  findOneStatusByName(@Param('name') name: string) {
    return this.statusService.findOneStatusByName(name);
  }

  @ApiOperation({ summary: "| Find status with id" })
  @UseGuards(JwtAuthGuard)
  @Get('id/:idd')
  findOneStatusById(@Param('idd') idd: string) {
    return this.statusService.findOneStatusById(idd);
  }

  @ApiOperation({ summary: "| Update Status" })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.updateStatus(+id, updateStatusDto);
  }

  @ApiOperation({ summary: "| Delete status" })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeStatus(@Param('id') id: string) {
    return this.statusService.removeStatus(+id);
  }
}