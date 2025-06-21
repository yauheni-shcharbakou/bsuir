import MinimalRepository from './MinimalRepository';

export default abstract class CrudRepository<M, D> extends MinimalRepository<M> {
  async create(dto: Partial<D>): Promise<M> {
    return (await this.authApi.post<M>(this.route, dto)).data;
  }

  async change(id: number, dto: Partial<D>): Promise<M> {
    return (await this.authApi.put<M>(`${this.route}/${id}`, dto)).data;
  }
}
