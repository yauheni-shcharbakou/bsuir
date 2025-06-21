import BaseApi from '../shared/base.api'

export default class PublisherApi extends BaseApi {
  url = '/publisher'

  async getAll() {
    return (await this.api.get(this.url)).data
  }

  async create(name, address) {
    return (await this.authApi.post(this.url, { name, address })).data
  }

  async change(_id, name, address) {
    return (await this.authApi.patch(this.url, { _id, name, address })).data
  }

  async delete(_id) {
    return (await this.authApi.delete(this.url, { data: { _id } })).data
  }
}
