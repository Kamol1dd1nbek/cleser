import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../guards/JwtAuth.guard';
import { RolesGuard } from '../guards/RolesAuth.guard';
import { Roles } from '../decorators/roles-auth.decorator';
import { CookieGetter } from '../decorators/cookieGetter.decorator';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Roles("ADMIN", "WORKER")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CookieGetter("refresh_token") refreshToken: string
  ) {
    return this.bookingService.findAll(refreshToken);
  }
}
