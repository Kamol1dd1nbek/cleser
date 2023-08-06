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
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { WorkerServiceModule } from './worker_service/worker_service.module';
import { User } from './user/models/user.model';
import { WorkerService } from './worker_service/models/worker_service.model';
import { UserRole } from './user/models/user_role.model';
import { RatingModule } from './rating/rating.module';
import { Rating } from './rating/models/rating.model';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/models/booking.entity';

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
        models: [Role, Status, Category, Service, User, WorkerService, UserRole, Rating, Booking],
      }),
      MailModule,
      StatusModule,
      RoleModule,
      CategoryModule,
      ServiceModule,
      UserModule,
      AuthModule,
      WorkerServiceModule,
      RatingModule,
      BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}