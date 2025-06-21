import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Option } from './option';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionDto } from './dto/option.dto';
import { EntityName } from '../../constants/enums';
import { getEntity } from '../../shared/helpers';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async getAll(): Promise<Option[]> {
    return this.optionRepository.find();
  }

  async getById(id: number): Promise<Option> {
    return getEntity(async () => this.optionRepository.findOneBy({ id }), EntityName.OPTION);
  }

  async create(dto: OptionDto): Promise<Option> {
    return this.optionRepository.save(this.optionRepository.create(dto));
  }

  async update(id: number, dto: OptionDto): Promise<Option> {
    await this.optionRepository.update({ id }, dto);
    return this.getById(id);
  }

  async delete(id: number): Promise<number> {
    await this.optionRepository.remove(await this.getById(id));
    return id;
  }
}
