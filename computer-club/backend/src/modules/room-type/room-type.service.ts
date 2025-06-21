import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomType } from './room-type';
import { RoomTypeDto } from './dto/room-type.dto';
import { EntityName } from '../../constants/enums';
import { getEntity } from '../../shared/helpers';

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType)
    private readonly roomTypeRepository: Repository<RoomType>,
  ) {}

  async getAll(): Promise<RoomType[]> {
    return this.roomTypeRepository.find();
  }

  async getById(id: number): Promise<RoomType> {
    return getEntity(async () => this.roomTypeRepository.findOneBy({ id }), EntityName.ROOM_TYPE);
  }

  async create(dto: RoomTypeDto): Promise<RoomType> {
    return this.roomTypeRepository.save(this.roomTypeRepository.create(dto));
  }

  async update(id: number, dto: RoomTypeDto): Promise<RoomType> {
    await this.roomTypeRepository.update({ id }, dto);
    return this.getById(id);
  }

  async delete(id: number): Promise<number> {
    await this.roomTypeRepository.remove(await this.getById(id));
    return id;
  }
}
