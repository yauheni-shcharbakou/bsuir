import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DATABASE_URL } from '../constants/common';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: DATABASE_URL,
  autoLoadEntities: true,
  synchronize: true,
};
