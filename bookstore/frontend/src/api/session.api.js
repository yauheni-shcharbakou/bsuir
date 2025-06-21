import BaseApi from '../shared/base.api'

export default class SessionApi extends BaseApi {
  url = '/session'

  async getAll() {
    return (await this.authApi.get(this.url)).data
  }
}
