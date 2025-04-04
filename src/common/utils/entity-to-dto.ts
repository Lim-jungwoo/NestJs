import { plainToInstance } from 'class-transformer';

export function toDto<T, V>(dtoClass: new () => T, entity: V): T {
  return plainToInstance(dtoClass, entity, {
    excludeExtraneousValues: true,
  });
}

export function toDtoList<T, V>(dtoClass: new () => T, entities: V[]): T[] {
  return plainToInstance(dtoClass, entities, {
    excludeExtraneousValues: true,
  });
}
