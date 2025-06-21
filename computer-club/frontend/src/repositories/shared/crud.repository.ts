import { MinimalRepository } from './minimal.repository';

export class CrudRepository<M, D> extends MinimalRepository<M> {
  async create(dto: Partial<D>): Promise<M> {
    return (await this.authInstance.post<M>(this.subRoute, dto)).data;
  }

  async update(id: number, dto: Partial<D>): Promise<M> {
    return (await this.authInstance.put<M>(`${this.subRoute}/${id}`, dto)).data;
  }
}
