import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event';
import { Repository } from 'typeorm';
import { User } from '../user/user';
import { EventDto } from './dto/event.dto';
import { EntityName } from '../../constants/enums';
import { getEntity } from '../../shared/helpers';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async getByUser(user: User): Promise<Event[]> {
    return (
      await this.eventRepository.find({
        relations: {
          seenBy: true,
        },
        order: { date: 'desc' },
      })
    ).map((event: Event) => {
      event.isNew = (event.seenBy || []).every((seenByUser: User) => seenByUser.id !== user.id);
      return event;
    });
  }

  async getById(id: number): Promise<Event> {
    return getEntity(async () => this.eventRepository.findOneBy({ id }), EntityName.EVENT);
  }

  async create(dto: EventDto): Promise<Event> {
    const { name, date } = dto;
    return this.eventRepository.save(this.eventRepository.create({ name, date: new Date(date) }));
  }

  async update(id: number, updatedFields: Partial<EventDto>): Promise<Event> {
    await this.eventRepository.update({ id }, updatedFields);
    return this.getById(id);
  }

  async addSeenByUser(id: number, user: User) {
    const event: Event = await this.getById(id);
    event.seenBy = (event.seenBy || []).concat([user]);
    await this.eventRepository.save(event);
  }

  async delete(id: number): Promise<number> {
    await this.eventRepository.delete({ id });
    return id;
  }
}
