import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rating } from './models/rating.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Rating]),
    JwtModule.register({})
  ],
  controllers: [RatingController],
  providers: [RatingService]
})
export class RatingModule {}
