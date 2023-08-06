import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateWorkerServiceDto } from './dto/create-worker_service.dto';
import { UpdateWorkerServiceDto } from './dto/update-worker_service.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WorkerService } from './models/worker_service.model';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation } from '@nestjs/swagger';

@Injectable()
export class WorkerServiceService {
  constructor(
    @InjectModel(WorkerService) private readonly wsRepo: typeof WorkerService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: "| View worker's services" })
  async myServices(refreshToken: string): Promise<WorkerService[]> {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const services = await this.wsRepo.findAll({
      where: { worker_id: userData.id },
      include: { all: true },
    });

    if (services.length === 0) {
      throw new NotFoundException("You don't have any services yet");
    }
    return services;
  }

  @ApiOperation({ summary: "| Add Worker's service" })
  async addService(refreshToken: string, createWSDto: CreateWorkerServiceDto) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (userData.id !== createWSDto.worker_id) {
      throw new BadRequestException('You have no such right');
    }

    const haveServices = await this.wsRepo.findOne({
      where: { worker_id: userData.id, service_id: createWSDto.service_id },
    });

    if (haveServices) {
      throw new BadRequestException('You already have this service');
    }

    const newService = await this.wsRepo.create(createWSDto);

    return newService;
  }

  @ApiOperation({ summary: "| Delete Worker's service" })
  async removeWService(refreshToken: string, s_id: number) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const isDeleted = await this.wsRepo.destroy({ where: { worker_id: userData.id, service_id: s_id } });

    if (isDeleted == 1) {
        return {
            messagege: "Successfully deleted",
            deleted_service_id: s_id
        }
    } else {
        throw new BadRequestException("You do not have this service");
    }
  }

  @ApiOperation({ summary: "| Delete Worker's service" })
  async updateAmount(refreshToken: string, s_id: number, updateWSDto: UpdateWorkerServiceDto) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const updatedWS = await this.wsRepo.update({...updateWSDto},{ where: { worker_id: userData.id, service_id: s_id } });
console.log(userData.id, s_id, updateWSDto);

    if (updatedWS[0] == 1) {
        return {
            messagege: "Successfully updated",
            // ws: updatedWS[1][0].dataValues
        }
    } else {
        throw new BadRequestException("You do not have this service");
    }
  }


}
