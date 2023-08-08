import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { Role } from './models/role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '../guards/JwtAuth.guard';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/RolesAuth.guard';

@ApiTags("Roles")
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: "| Add new role" })
  @ApiResponse({ status: 201, type: Role })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  addRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.addRole(createRoleDto);
  }

  @ApiOperation({ summary: "| Find all rolees" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAllRolees() {
    return this.roleService.findAllRolees();
  }

  @ApiOperation({ summary: "| Find role with name" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('name/:name')
  findOneRoleByName(@Param('name') name: string) {
    return this.roleService.findOneRoleByName(name);
  }

  @ApiOperation({ summary: "| Find role with id" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('id/:idd')
  findOneRoleById(@Param('idd') idd: string) {
    return this.roleService.findOneRoleById(+idd);
  }

  @ApiOperation({ summary: "| Update Role" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(+id, updateRoleDto);
  }

  @ApiOperation({ summary: "| Delete role" })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeRole(@Param('id') id: string) {
    return this.roleService.removeRole(+id);
  }
}