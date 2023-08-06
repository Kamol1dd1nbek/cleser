import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkerServiceService } from './worker_service.service';
import { CreateWorkerServiceDto } from './dto/create-worker_service.dto';
import { UpdateWorkerServiceDto } from './dto/update-worker_service.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('ws')
export class WorkerServiceController {
  constructor(private readonly workerServiceService: WorkerServiceService) {}

  @Post()
  addService(@Body() createWorkerServiceDto: CreateWorkerServiceDto,
  @CookieGetter("refresh_token") refreshToken: string) {
    return this.workerServiceService.addService(refreshToken, createWorkerServiceDto);
  }

  @Get()
  finmyServicesdAll(
    @CookieGetter("refresh_token") refreshToken: string
  ) {
    return this.workerServiceService.myServices(refreshToken);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.workerServiceService.findOne(+id);
  // }

  @ApiOperation({ summary: "| Update service amount" })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWSDto: UpdateWorkerServiceDto,
    @CookieGetter("refresh_token") refreshToken: string,
    ) {
    return this.workerServiceService.updateAmount(refreshToken, +id, updateWSDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CookieGetter("refresh_token") refreshToken: string) {
    return this.workerServiceService.removeWService(refreshToken, +id);
  }
}
