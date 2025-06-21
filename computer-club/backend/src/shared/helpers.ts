import { EntityName } from '../constants/enums';
import { EntityNotFoundError } from './errors/entity-not-found.error';

export const getEntity = async <T>(query: () => Promise<T | null>, entityName: EntityName) => {
  const entity: T | null = await query();

  if (!entity) {
    throw new EntityNotFoundError(entityName);
  }

  return entity;
};
