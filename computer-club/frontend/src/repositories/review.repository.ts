import { BaseRepository } from './shared/base.repository';
import { Repository, Singleton } from '../shared/decorators';
import { ReviewPopulated } from '../abstractions/models';
import { DeleteDto } from '../abstractions/dto';
import { EndPoint } from '../constants/enums';

@Singleton()
@Repository(EndPoint.REVIEWS)
export class ReviewRepository extends BaseRepository {
  async getById(id: number): Promise<ReviewPopulated> {
    return (await this.authInstance.get<ReviewPopulated>(`${this.subRoute}/${id}`)).data;
  }

  async update(id: number, text: string): Promise<ReviewPopulated> {
    return (await this.authInstance.put<ReviewPopulated>(`${this.subRoute}/${id}`, { text })).data;
  }

  async delete(id: number): Promise<number> {
    return (await this.authInstance.delete<DeleteDto>(`${this.subRoute}/${id}`)).data.id;
  }
}
