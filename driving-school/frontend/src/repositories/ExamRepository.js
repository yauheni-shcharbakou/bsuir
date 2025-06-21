import BaseRepository from '../core/BaseRepository'

export default class ExamRepository extends BaseRepository {
  url = '/exams'

  async getAll() {
    return (await this.api.get(this.url)).data
  }

  async create(dto) {
    return (await this.api.post(this.url, dto)).data
  }

  async change(id, dto) {
    return (await this.api.put(`${this.url}/${id}`, dto)).data
  }

  async delete(id) {
    return (await this.api.delete(`${this.url}/${id}`)).data
  }
}
