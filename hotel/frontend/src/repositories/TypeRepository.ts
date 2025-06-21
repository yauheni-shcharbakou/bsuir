import { Type, TypePopulated } from '../abstractions/models';
import { APIRoute } from '../constants/enums';
import { Repository } from '../shared/decorators';
import CrudRepository from '../core/CrudRepository';

@Repository(APIRoute.TYPES)
export default class TypeRepository extends CrudRepository<TypePopulated, Type> {}
