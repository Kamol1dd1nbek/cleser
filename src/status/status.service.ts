import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectModel } from "@nestjs/sequelize"
import { Status } from './models/status.model';
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Op } from 'sequelize';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status) private readonly statusRepo: typeof Status
  ) {}

  // ADD STATUS

  async addStatus(createStatusDto: CreateStatusDto): Promise<Status> {
    const isHave = await this.statusRepo.findOne({ where: { name: createStatusDto.name } });

    if ( isHave ) {
      throw new BadRequestException("This status has been added before");
    }

    const reName = createStatusDto.name.toUpperCase();

    const newStatus = await this.statusRepo.create({...createStatusDto, name: reName});

    return newStatus;
  }

  // FIND ALL STATUSES

  async findAllStatuses(): Promise<Status[]> {
    const statuses = await this.statusRepo.findAll();

    if ( statuses.length === 0 ) {
      throw new NotFoundException("Statuses have not been added yet!");
    }

    return statuses;
  }

  // FIND ONE STATUS BY ID

  async findOneStatusById(id: string): Promise<Status> {
    const status = await this.statusRepo.findOne({ where: { id } });
    console.log(status);
    

    if ( !status ) {
      throw new NotFoundException(`Status not found with this id: ${id}`);
    }

    return status;
  }

    // FIND ONE STATUS BY NAME

  async findOneStatusByName(name: string): Promise<Status> {
    const nameLike = {[Op.like]: `%${name.toUpperCase()}%`};
    const status = await this.statusRepo.findOne({ where: { name: nameLike } });    

    if ( !status ) {
      throw new NotFoundException(`Status not found with this name: ${name}`);
    }

    return status;
  }

  // UPDATE STATUS

  async updateStatus(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const updatedStatus = await this.statusRepo.update( { ...updateStatusDto }, { where: { id }, returning: true } );

    if ( updatedStatus[0] == 0 ) {
      throw new NotFoundException(`Status not found with this id: ${id}`);
    }

    return updatedStatus[1][0].dataValues;
  }

  // REMOVE STATUS

  async removeStatus(id: number): Promise<Object> {
    const removedStatus = await this.statusRepo.destroy( { where: { id }} );

    if ( removedStatus == 0 ) {
      throw new NotFoundException(`Status not found with this id: ${id}`);
    }

    return {
      message: `Status on id ${id} has been deleted successfully`
    };
  }
}