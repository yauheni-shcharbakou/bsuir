import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order';
import { Option } from '../option/option';
import { User } from '../user/user';
import { getEntity } from '../../shared/helpers';
import { EntityName } from '../../constants/enums';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getByUser(user: User): Promise<Order[]> {
    return this.orderRepository
      .createQueryBuilder(Order.name)
      .where({ user })
      .leftJoinAndSelect(`${Order.name}.option`, Option.name)
      .orderBy(`${Order.name}.createdAt`, 'DESC')
      .getMany();
  }

  async getById(id: number): Promise<Order> {
    return getEntity(async () => {
      return this.orderRepository
        .createQueryBuilder(Order.name)
        .where({ id })
        .leftJoinAndSelect(`${Order.name}.option`, Option.name)
        .getOne();
    }, EntityName.ORDER);
  }

  async create(user: User, option: Option, amount: number): Promise<Order> {
    return this.orderRepository.save(this.orderRepository.create({ user, option, amount }));
  }

  async delete(id: number): Promise<number> {
    await this.orderRepository.delete({ id });
    return id;
  }
}
