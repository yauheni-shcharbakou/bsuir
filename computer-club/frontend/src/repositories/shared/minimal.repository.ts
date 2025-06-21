import { BaseRepository } from './base.repository';
import { DeleteDto } from '../../abstractions/dto';

export class MinimalRepository<M> extends BaseRepository {
  async getAll(): Promise<M[]> {
    return (await this.authInstance.get<M[]>(this.subRoute)).data;
  }

  async getById(id: number): Promise<M> {
    return (await this.authInstance.get<M>(`${this.subRoute}/${id}`)).data;
  }

  async delete(id: number): Promise<number> {
    return (await this.authInstance.delete<DeleteDto>(`${this.subRoute}/${id}`)).data.id;
  }
}
