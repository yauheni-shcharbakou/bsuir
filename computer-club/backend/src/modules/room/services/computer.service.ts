import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Computer } from '../entities/computer';
import { ComputerType } from '../../computer-type/computer-type';
import { Room } from '../entities/room';
import { Booking } from '../../booking/booking';
import { getEntity } from '../../../shared/helpers';
import { EntityName } from '../../../constants/enums';

@Injectable()
export class ComputerService {
  constructor(
    @InjectRepository(Computer)
    private readonly computerRepository: Repository<Computer>,
  ) {}

  async getByRoom(room: Room): Promise<Computer[]> {
    return this.computerRepository
      .createQueryBuilder(Computer.name)
      .where({ room })
      .leftJoinAndSelect(`${Computer.name}.type`, ComputerType.name)
      .leftJoinAndSelect(`${Computer.name}.room`, Room.name)
      .leftJoinAndSelect(`${Computer.name}.bookings`, Booking.name)
      .getMany();
  }

  async getById(id: number): Promise<Computer> {
    return getEntity(async () => {
      return this.computerRepository
        .createQueryBuilder(Computer.name)
        .where({ id })
        .leftJoinAndSelect(`${Computer.name}.type`, ComputerType.name)
        .leftJoinAndSelect(`${Computer.name}.room`, Room.name)
        .leftJoinAndSelect(`${Computer.name}.bookings`, Booking.name)
        .getOne();
    }, EntityName.COMPUTER);
  }

  async create(room: Room, type: ComputerType, code: number): Promise<Computer> {
    return this.computerRepository.save(this.computerRepository.create({ room, type, code }));
  }

  async update(id: number, updatedFields: Partial<Computer>): Promise<Computer> {
    await this.computerRepository.update({ id }, updatedFields);
    return this.getById(id);
  }

  async delete(id: number): Promise<number> {
    await this.computerRepository.remove(await this.getById(id));
    return id;
  }
}
