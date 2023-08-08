import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../guards/JwtAuth.guard';
import { RolesGuard } from '../guards/RolesAuth.guard';
import { Roles } from '../decorators/roles-auth.decorator';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Booking")
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: "| Create booking" })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @ApiOperation({ summary: "| Worker's all bookings" })
  @Roles("ADMIN", "WORKER")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @CookieGetter("refresh_token") refreshToken: string
  ) {
    return this.bookingService.findAll(refreshToken);
  }

  @ApiOperation({ summary: "| Confirm booking from worker" })
  @Roles("ADMIN", "WORKER")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  confirm(
    @CookieGetter("refresh_token") refreshToken: string,
    @Param("id") id : string
  ) {
    return this.bookingService.confirm(refreshToken, +id);
  }

  @ApiOperation({ summary: "| Reject booking from worker" })
  @Roles("ADMIN", "WORKER")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get("reject/:id")
  reject(
    @CookieGetter("refresh_token") refreshToken: string,
    @Param("id") id : string
  ) {
    return this.bookingService.reject(refreshToken, +id);
  }
}
