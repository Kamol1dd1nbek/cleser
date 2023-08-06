import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Rating } from './models/rating.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating) private readonly ratingRepo: typeof Rating,
    private readonly jwtService: JwtService,
  ) {}

  async postRating(createRatingDto: CreateRatingDto): Promise<Rating> {
    const comment = await this.ratingRepo.create(createRatingDto);

    return comment;
  }

  async getComments(id: number): Promise<Rating[]> {
    const comments = await this.ratingRepo.findAll({ where: { worker_id: id }, include: {all: true} });

    return comments;
  }
}
