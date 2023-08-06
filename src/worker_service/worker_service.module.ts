import { Module } from '@nestjs/common';
import { WorkerServiceService } from './worker_service.service';
import { WorkerServiceController } from './worker_service.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkerService } from './models/worker_service.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([WorkerService]),
    JwtModule.register({})
  ],
  controllers: [WorkerServiceController],
  providers: [WorkerServiceService]
})
export class WorkerServiceModule {}
