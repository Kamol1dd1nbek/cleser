import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { Status } from './models/status.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Status])
  ],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [StatusModule]
})
export class StatusModule {}