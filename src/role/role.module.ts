import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './models/role.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Role])
  ],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}