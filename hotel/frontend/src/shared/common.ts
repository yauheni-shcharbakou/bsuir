import createCache from '@emotion/cache';
import { IErrorResponse, IIterableObject } from '../abstractions/interfaces';
import { Entity } from '../abstractions/models';

export function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}

export const clearObject = (object: any): IIterableObject => {
  return Object.keys(object).reduce((acc: IIterableObject, key: string) => {
    if (object[key] === null || object[key] === undefined) {
      return acc;
    }

    acc[key] = object[key];
    return acc;
  }, {});
};

export const errorHandler = (e: unknown) => {
  if ((e as IErrorResponse).response?.data?.message) {
    alert((e as IErrorResponse).response?.data?.message || 'Error');
  }
};

export function getEntityById<T extends Entity>(array: T[], id: number): () => T | undefined {
  return () => array.find(({ id: entityId }) => entityId === id);
}

export function addEntity<T extends Entity>(array: T[], entity: T): () => T[] {
  return () => [...array, entity];
}

export function deleteEntityById<T extends Entity>(array: T[], id: number): () => T[] {
  return () => array.filter(({ id: entityId }) => entityId !== id);
}

export function changeEntityById<T extends Entity>(
  array: T[],
  id: number,
  updated: Partial<T>
): () => T[] {
  return () => array.map((entity: T) => (entity.id === id ? { ...entity, ...updated } : entity));
}
