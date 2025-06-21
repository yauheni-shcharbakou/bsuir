import BaseApi from '../shared/base.api'

export default class OfferApi extends BaseApi {
  url = '/offer'

  async getAll() {
    return (await this.api.get(this.url)).data
  }

  async getCurrent(_user) {
    return (await this.api.get(`${this.url}/current`, { params: { _user } })).data
  }

  async create(_book, _user, salesman, amount, price) {
    return (
      await this.authApi.post(this.url, {
        _book,
        _user,
        salesman,
        amount,
        price,
      })
    ).data
  }

  async change(_id, _book, _user, amount, price) {
    return (await this.authApi.patch(this.url, { _id, _book, _user, amount, price })).data
  }

  async delete(_id) {
    return (await this.authApi.delete(this.url, { data: { _id } })).data
  }
}
