import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking';
import { BookingDto } from './dto/booking.dto';
import { User } from '../user/user';
import { Computer } from '../room/entities/computer';
import { EntityName } from '../../constants/enums';
import { getEntity } from '../../shared/helpers';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async getByUser(user: User): Promise<Booking[]> {
    return this.bookingRepository
      .createQueryBuilder(Booking.name)
      .where({ user })
      .leftJoinAndSelect(`${Booking.name}.user`, User.name)
      .leftJoinAndSelect(`${Booking.name}.computer`, Computer.name)
      .orderBy(`${Booking.name}.date`, 'DESC')
      .getMany();
  }

  async getByComputer(computer: Computer): Promise<Booking[]> {
    return this.bookingRepository
      .createQueryBuilder(Booking.name)
      .where({ computer })
      .leftJoinAndSelect(`${Booking.name}.user`, User.name)
      .leftJoinAndSelect(`${Booking.name}.computer`, Computer.name)
      .getMany();
  }

  async getById(id: number): Promise<Booking> {
    return getEntity(async () => {
      return this.bookingRepository
        .createQueryBuilder(Booking.name)
        .where({ id })
        .leftJoinAndSelect(`${Booking.name}.user`, User.name)
        .leftJoinAndSelect(`${Booking.name}.computer`, Computer.name)
        .getOne();
    }, EntityName.BOOKING);
  }

  async create(user: User, computer: Computer, dto: BookingDto): Promise<Booking> {
    const { date, hours } = dto;
    return this.bookingRepository.save(this.bookingRepository.create({ user, computer, hours, date: new Date(date) }));
  }

  async update(id: number, dto: BookingDto): Promise<Booking> {
    const { date, hours } = dto;
    await this.bookingRepository.update({ id }, { hours, date: new Date(date) });
    return this.getById(id);
  }

  async delete(id: number): Promise<number> {
    await this.bookingRepository.delete({ id });
    return id;
  }
}
