import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtAuthGuard } from '../guards/JwtAuth.guard';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  postComment(@Body() createPost: CreateRatingDto) {
    return this.ratingService.postRating(createPost);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  getComments(@Param("id") id: string){
    return this.ratingService.getComments(+id);
  }
}