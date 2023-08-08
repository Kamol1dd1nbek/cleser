import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtAuthGuard } from '../guards/JwtAuth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Ratings")
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @ApiOperation({ summary: "| Post comment" })
  @Post()
  postComment(@Body() createPost: CreateRatingDto) {
    return this.ratingService.postRating(createPost);
  }

  @ApiOperation({ summary: "| Get Comments" })
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  getComments(@Param("id") id: string){
    return this.ratingService.getComments(+id);
  }
}