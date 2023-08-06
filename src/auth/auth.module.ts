import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/models/user.model';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { RoleService } from '../role/role.service';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => RoleModule),
    SequelizeModule.forFeature([User]),
    MailModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
