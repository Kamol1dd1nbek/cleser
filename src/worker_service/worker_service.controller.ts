import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkerServiceService } from './worker_service.service';
import { CreateWorkerServiceDto } from './dto/create-worker_service.dto';
import { UpdateWorkerServiceDto } from './dto/update-worker_service.dto';

@Controller('worker-service')
export class WorkerServiceController {
  constructor(private readonly workerServiceService: WorkerServiceService) {}

  // @Post()
  // create(@Body() createWorkerServiceDto: CreateWorkerServiceDto) {
  //   return this.workerServiceService.create(createWorkerServiceDto);
  // }

  // @Get()
  // findAll() {
  //   return this.workerServiceService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.workerServiceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWorkerServiceDto: UpdateWorkerServiceDto) {
  //   return this.workerServiceService.update(+id, updateWorkerServiceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.workerServiceService.remove(+id);
  // }
}
