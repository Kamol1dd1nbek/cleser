import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Op } from 'sequelize';
import { Role } from './models/role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private readonly roleRepo: typeof Role
  ) {}

  // ADD ROLE

  async addRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const isHave = await this.roleRepo.findOne({ where: { name: createRoleDto.name } });

    if ( isHave ) {
      throw new BadRequestException("This role has been added before");
    }

    const reName = createRoleDto.name.toUpperCase();

    const newRole = await this.roleRepo.create({...createRoleDto, name: reName});

    return newRole;
  }

  // FIND ALL ROLES

  async findAllRolees(): Promise<Role[]> {
    const rolees = await this.roleRepo.findAll();

    if ( rolees.length === 0 ) {
      throw new NotFoundException("Roles have not been added yet!");
    }

    return rolees;
  }

  // FIND ONE ROLE BY ID

  async findOneRoleById(id: number): Promise<Role> {
    const role = await this.roleRepo.findOne({ where: { id } });
    console.log(role);
    

    if ( !role ) {
      throw new NotFoundException(`Role not found with this id: ${id}`);
    }

    return role;
  }

    // FIND ONE ROLE BY NAME

  async findOneRoleByName(name: string): Promise<Role> {
    const nameLike = {[Op.like]: `%${name.toUpperCase()}%`};
    const role = await this.roleRepo.findOne({ where: { name: nameLike } });    

    if ( !role ) {
      throw new NotFoundException(`Role not found with this name: ${name}`);
    }

    return role;
  }

  // UPDATE ROLE

  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const updatedRole = await this.roleRepo.update( { ...updateRoleDto }, { where: { id }, returning: true } );

    if ( updatedRole[0] == 0 ) {
      throw new NotFoundException(`Role not found with this id: ${id}`);
    }

    return updatedRole[1][0].dataValues;
  }

  // REMOVE ROLE

  async removeRole(id: number): Promise<Object> {
    const removedRole = await this.roleRepo.destroy( { where: { id }} );

    if ( removedRole == 0 ) {
      throw new NotFoundException(`Role not found with this id: ${id}`);
    }

    return {
      message: `Role on id ${id} has been deleted successfully`
    };
  }
}