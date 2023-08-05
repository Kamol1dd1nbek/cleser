import { Module } from '@nestjs/common';
import { WorkerServiceService } from './worker_service.service';
import { WorkerServiceController } from './worker_service.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkerService } from './models/worker_service.model';

@Module({
  imports: [
    SequelizeModule.forFeature([WorkerService])
  ],
  controllers: [WorkerServiceController],
  providers: [WorkerServiceService]
})
export class WorkerServiceModule {}
