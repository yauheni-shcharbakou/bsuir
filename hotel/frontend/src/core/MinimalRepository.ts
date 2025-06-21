import { DeleteModel } from '../abstractions/models';
import BaseRepository from './BaseRepository';

export default abstract class MinimalRepository<M> extends BaseRepository {
  async getAll(): Promise<M[]> {
    return (await this.api.get<M[]>(this.route)).data;
  }

  async getOne(id: number): Promise<M> {
    return (await this.authApi.get<M>(`${this.route}/${id}`)).data;
  }

  async delete(id: number): Promise<number> {
    return (await this.authApi.delete<DeleteModel>(`${this.route}/${id}`)).data.id;
  }
}
