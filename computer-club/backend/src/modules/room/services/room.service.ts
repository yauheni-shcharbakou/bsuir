import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entities/room';
import { RoomType } from '../../room-type/room-type';
import { Review } from '../../review/review';
import { Computer } from '../entities/computer';
import { getEntity } from '../../../shared/helpers';
import { EntityName } from '../../../constants/enums';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async getAll(): Promise<Room[]> {
    return this.roomRepository.find({ relations: { type: true, computers: true, reviews: true } });
  }

  async getById(id: number): Promise<Room> {
    return getEntity(async () => {
      return this.roomRepository
        .createQueryBuilder(Room.name)
        .where({ id })
        .leftJoinAndSelect(`${Room.name}.type`, RoomType.name)
        .leftJoinAndSelect(`${Room.name}.reviews`, Review.name)
        .leftJoinAndSelect(`${Room.name}.computers`, Computer.name)
        .getOne();
    }, EntityName.ROOM);
  }

  async create(type: RoomType, name: string): Promise<Room> {
    return this.roomRepository.save(this.roomRepository.create({ type, name }));
  }

  async update(id: number, type: RoomType, name: string): Promise<Room> {
    await this.roomRepository.update({ id }, { type, name });
    return this.getById(id);
  }

  async delete(id: number): Promise<number> {
    await this.roomRepository.remove(await this.getById(id));
    return id;
  }
}
