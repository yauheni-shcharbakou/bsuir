import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user';
import { Review } from './review';
import { Room } from '../room/entities/room';
import { getEntity } from '../../shared/helpers';
import { EntityName } from '../../constants/enums';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async getByRoom(room: Room): Promise<Review[]> {
    return this.reviewRepository
      .createQueryBuilder(Review.name)
      .where({ room })
      .leftJoinAndSelect(`${Review.name}.user`, User.name)
      .getMany();
  }

  async getById(id: number): Promise<Review> {
    return getEntity(async () => {
      return this.reviewRepository
        .createQueryBuilder(Review.name)
        .where({ id })
        .leftJoinAndSelect(`${Review.name}.user`, User.name)
        .getOne();
    }, EntityName.REVIEW);
  }

  async create(user: User, room: Room, text: string): Promise<Review> {
    return this.reviewRepository.save(this.reviewRepository.create({ user, room, text }));
  }

  async update(id: number, text: string): Promise<Review> {
    await this.reviewRepository.update({ id }, { text });
    return this.getById(id);
  }

  async delete(id: number): Promise<number> {
    await this.reviewRepository.delete({ id });
    return id;
  }
}
