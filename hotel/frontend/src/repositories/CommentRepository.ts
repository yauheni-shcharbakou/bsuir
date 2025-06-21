import { Comment } from '../abstractions/models';
import { APIRoute } from '../constants/enums';
import { Repository } from '../shared/decorators';
import CrudRepository from '../core/CrudRepository';

@Repository(APIRoute.COMMENTS)
export default class CommentRepository extends CrudRepository<Comment, Comment> {}
