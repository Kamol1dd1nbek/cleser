import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatusModule } from './status/status.module';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';
import { Role } from './role/models/role.model';
import { Status } from './status/models/status.model';
import { Category } from './category/models/category.model';
import { ServiceModule } from './service/service.module';
import { Service } from './service/models/service.model';

@Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        username: process.env.PG_USER,
        password: String(process.env.PG_PASSWORD),
        port: +process.env.PG_PORT,
        host: String(process.env.PG_HOST),
        database: process.env.PG_DB,
        logging: true,
        autoLoadModels: true,
        models: [Role, Status, Category, Service],
      }),
      StatusModule,
      RoleModule,
      CategoryModule,
      ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}