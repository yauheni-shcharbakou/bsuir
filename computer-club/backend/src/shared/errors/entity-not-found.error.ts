import { BaseError } from './base.error';
import { HttpStatus } from '@nestjs/common';

export class EntityNotFoundError extends BaseError {
  constructor(entityName: string) {
    super(HttpStatus.NOT_FOUND, `Не удалось найти сущность '${entityName}'`);
  }
}
