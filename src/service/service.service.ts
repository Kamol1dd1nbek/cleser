import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { Service } from './models/service.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service) private readonly serviceRepo: typeof Service,
  ) {}

  // ADD SERVICE

  async addService(createServiceDto: CreateServiceDto): Promise<Service> {
    const isHave = await this.serviceRepo.findOne({
      where: { name: createServiceDto.name },
    });

    if (isHave) {
      throw new BadRequestException('This service has been added before');
    }

    const newService = await this.serviceRepo.create(createServiceDto);

    return newService;
  }

  // FIND ALL SERVICES

  async findAllServicees(): Promise<Service[]> {
    const services = await this.serviceRepo.findAll({ include: { all: true } });

    if (services.length === 0) {
      throw new NotFoundException('Services have not been added yet!');
    }

    return services;
  }

  // FIND ONE SERVICE BY ID

  async findOneServiceById(id: number): Promise<Service> {
    const service = await this.serviceRepo.findOne({
      where: { id },
      include: { all: true },
    });

    if (!service) {
      throw new NotFoundException(`Service not found with this id: ${id}`);
    }

    return service;
  }

  // FIND ONE SERVICE BY NAME

  async findOneServiceByName(name: string): Promise<Service> {
    const nameLike = { [Op.iLike]: `%${name}%` };
    const sevice = await this.serviceRepo.findOne({ where: { name: nameLike } });

    if (!sevice) {
      throw new NotFoundException(`Service not found with this name: ${name}`);
    }

    return sevice;
  }

  // UPDATE SERVICE

  async updateService(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const updatedService = await this.serviceRepo.update(
      { ...updateServiceDto },
      { where: { id }, returning: true },
    );

    if (updatedService[0] == 0) {
      throw new NotFoundException(`Service not found with this id: ${id}`);
    }

    return updatedService[1][0].dataValues;
  }

  // REMOVE SERVICE

  async removeService(id: number): Promise<Object> {
    const removedService = await this.serviceRepo.destroy({ where: { id } });

    if (removedService == 0) {
      throw new NotFoundException(`Service not found with this id: ${id}`);
    }

    return {
      message: `Service on id ${id} has been deleted successfully`,
    };
  }
}