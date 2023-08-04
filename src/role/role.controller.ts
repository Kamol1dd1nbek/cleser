import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { Role } from './models/role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags("Roles")
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: "| Add new role" })
  @ApiResponse({ status: 201, type: Role })
  @Post()
  addRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.addRole(createRoleDto);
  }

  @ApiOperation({ summary: "| Find all rolees" })
  @Get()
  findAllRolees() {
    return this.roleService.findAllRolees();
  }

  @Get('name/:name')
  @ApiOperation({ summary: "| Find role with name" })
  findOneRoleByName(@Param('name') name: string) {
    return this.roleService.findOneRoleByName(name);
  }

  @Get('id/:idd')
  @ApiOperation({ summary: "| Find role with id" })
  findOneRoleById(@Param('idd') idd: string) {
    return this.roleService.findOneRoleById(+idd);
  }

  @ApiOperation({ summary: "| Update Role" })
  @Patch(':id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(+id, updateRoleDto);
  }

  @ApiOperation({ summary: "| Delete role" })
  @Delete(':id')
  removeRole(@Param('id') id: string) {
    return this.roleService.removeRole(+id);
  }
}