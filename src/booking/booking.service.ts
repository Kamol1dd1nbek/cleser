import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './models/booking.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking) private readonly bookingRepo: typeof Booking,
    private readonly jwtService: JwtService) {}

  create(createBookingDto: CreateBookingDto) {
    return this.bookingRepo.create(createBookingDto);
  }

  async findAll(refreshToken: string) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new BadRequestException("Unauthorization")
    }

    if (userData.roles[0].name !== "WORKER") {
      throw new BadRequestException("You are not worker")
    }
    return this.bookingRepo.findAll({ where: {worker_id: userData.id}, include: {all:true} });
  }

  async confirm(refreshToken: string, booking_id: number) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new BadRequestException("Unauthorization")
    }

    if (userData.roles[0].name !== "WORKER") {
      throw new BadRequestException("You are not worker")
    }
    return this.bookingRepo.update({status_id: 1}, { where: {worker_id: userData.id, id: booking_id} });
  }

  async reject(refreshToken: string, booking_id: number) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new BadRequestException("Unauthorization")
    }

    if (userData.roles[0].name !== "WORKER") {
      throw new BadRequestException("You are not worker")
    }
    return this.bookingRepo.update({status_id: 3}, { where: {worker_id: userData.id, id: booking_id} });
  }

}