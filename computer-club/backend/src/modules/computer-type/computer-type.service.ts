import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComputerType } from './computer-type';
import { Repository } from 'typeorm';
import { ComputerTypeDto } from './dto/computer-type.dto';
import { EntityName } from '../../constants/enums';
import { getEntity } from '../../shared/helpers';

@Injectable()
export class ComputerTypeService {
  constructor(
    @InjectRepository(ComputerType)
    private readonly computerTypeRepository: Repository<ComputerType>,
  ) {}

  async getAll(): Promise<ComputerType[]> {
    return this.computerTypeRepository.find();
  }

  async getById(id: number): Promise<ComputerType> {
    return getEntity(async () => this.computerTypeRepository.findOneBy({ id }), EntityName.COMPUTER_TYPE);
  }

  async create(dto: ComputerTypeDto): Promise<ComputerType> {
    return this.computerTypeRepository.save(this.computerTypeRepository.create(dto));
  }

  async update(id: number, dto: ComputerTypeDto): Promise<ComputerType> {
    await this.computerTypeRepository.update({ id }, dto);
    return this.getById(id);
  }

  async delete(id: number): Promise<number> {
    await this.computerTypeRepository.remove(await this.getById(id));
    return id;
  }
}
