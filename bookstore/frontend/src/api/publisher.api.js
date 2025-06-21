import BaseApi from '../shared/base.api'

export default class PublisherApi extends BaseApi {
  url = '/publisher'

  async getAll() {
    return (await this.api.get(this.url)).data
  }

  async create(name, address) {
    return (await this.authApi.post(this.url, { name, address })).data
  }

  async change(id, name, address) {
    return (await this.authApi.patch(this.url, { id, name, address })).data
  }

  async delete(id) {
    return (await this.authApi.delete(this.url, { data: { id } })).data
  }
}
