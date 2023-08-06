import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WorkerServiceService } from './worker_service.service';
import { CreateWorkerServiceDto } from './dto/create-worker_service.dto';
import { UpdateWorkerServiceDto } from './dto/update-worker_service.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/JwtAuth.guard';
import { SelfAuthGuard } from '../guards/SelfAuth.guard';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/RolesAuth.guard';

@Controller('ws')
export class WorkerServiceController {
  constructor(private readonly workerServiceService: WorkerServiceService) {}

  @ApiOperation({ summary: "| Add Service to user" })
  @UseGuards(JwtAuthGuard)
  @Post()
  addService(@Body() createWorkerServiceDto: CreateWorkerServiceDto,
  @CookieGetter("refresh_token") refreshToken: string) {
    return this.workerServiceService.addService(refreshToken, createWorkerServiceDto);
  }

  @ApiOperation({ summary: "| Get all services user's" })
  @Roles("WORKER")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  finmyServicesdAll(
    @CookieGetter("refresh_token") refreshToken: string
  ) {
    return this.workerServiceService.myServices(refreshToken);
  }

  @ApiOperation({ summary: "| Update service amount" })
  @UseGuards(SelfAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWSDto: UpdateWorkerServiceDto,
    @CookieGetter("refresh_token") refreshToken: string,
    ) {
    return this.workerServiceService.updateAmount(refreshToken, +id, updateWSDto);
  }

  @ApiOperation({ summary: "| Remove service" })
  @UseGuards(SelfAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @CookieGetter("refresh_token") refreshToken: string) {
    return this.workerServiceService.removeWService(refreshToken, +id);
  }
}
