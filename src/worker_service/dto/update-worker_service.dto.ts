import { PartialType } from '@nestjs/swagger';
import { CreateWorkerServiceDto } from './create-worker_service.dto';

export class UpdateWorkerServiceDto extends PartialType(CreateWorkerServiceDto) {}
