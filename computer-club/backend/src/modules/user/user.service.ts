import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT } from '../../constants/common';
import { EntityName, UserRole } from '../../constants/enums';
import { getEntity } from '../../shared/helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: number): Promise<User> {
    return getEntity(async () => this.userRepository.findOneBy({ id }), EntityName.USER);
  }

  async getByEmail(email: string): Promise<User> {
    return getEntity(async () => this.userRepository.findOneBy({ email }), EntityName.USER);
  }

  async create(dto: Partial<UserDto>): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(dto.password, BCRYPT_SALT);
    const usersAmount: number = await this.userRepository.count();

    return this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password: hashedPassword,
        role: usersAmount ? UserRole.CLIENT : UserRole.ADMIN,
      }),
    );
  }

  async update(id: number, updatedFields: Partial<UserDto>): Promise<User> {
    await this.userRepository.update({ id }, updatedFields);
    return this.getById(id);
  }

  async delete(id: number): Promise<number> {
    await this.userRepository.remove(await this.getById(id));
    return id;
  }
}
