import BaseRepository from '../core/BaseRepository'

export default class StudentRepository extends BaseRepository {
  url = '/students'

  async getAll() {
    return (await this.api.get(this.url)).data
  }

  async getById(id) {
    return (await this.api.get(`${this.url}/${id}`)).data
  }

  async getStudentExams(studentId) {
    return (await this.api.get(`${this.url}/${studentId}/exams`)).data
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
