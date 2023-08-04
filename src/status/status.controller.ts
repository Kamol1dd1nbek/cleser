import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Status } from './models/status.model';

@ApiTags("Statuses")
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: "| Add new status" })
  @ApiResponse({ status: 201, type: Status })
  @Post()
  addStatus(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.addStatus(createStatusDto);
  }

  @ApiOperation({ summary: "| Find all statuses" })
  @Get()
  findAllStatuses() {
    return this.statusService.findAllStatuses();
  }

  @Get('name/:name')
  @ApiOperation({ summary: "| Find status with name" })
  findOneStatusByName(@Param('name') name: string) {
    return this.statusService.findOneStatusByName(name);
  }

  @Get('id/:idd')
  @ApiOperation({ summary: "| Find status with id" })
  findOneStatusById(@Param('idd') idd: string) {
    return this.statusService.findOneStatusById(idd);
  }

  @ApiOperation({ summary: "| Update Status" })
  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.updateStatus(+id, updateStatusDto);
  }

  @ApiOperation({ summary: "| Delete status" })
  @Delete(':id')
  removeStatus(@Param('id') id: string) {
    return this.statusService.removeStatus(+id);
  }
}