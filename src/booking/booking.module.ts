import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './models/booking.entity';

@Module({
  imports: [SequelizeModule.forFeature([Booking])],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
