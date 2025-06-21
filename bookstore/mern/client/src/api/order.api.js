import BaseApi from '../shared/base.api'

export default class OrderApi extends BaseApi {
  url = '/order'

  async getAll(_user, role) {
    let data = []

    const customerData = await (
      await this.api.get(`${this.url}/customer`, { params: { _user } })
    ).data
    const salesmanData = await (
      await this.api.get(`${this.url}/salesman`, { params: { _user } })
    ).data

    switch (role) {
      case 'customer':
        data = customerData
        break
      case 'salesman':
        data = salesmanData
        break
      default:
        data = [...customerData, ...salesmanData]
        break
    }

    return data
  }

  async create(_offer, _book, _payment, _customer, _salesman, amount, price) {
    return (
      await this.api.post(this.url, {
        _offer,
        _book,
        _payment,
        _customer,
        _salesman,
        amount,
        price,
      })
    ).data
  }

  async delete(_id) {
    return (await this.api.delete(this.url, { data: { _id } })).data
  }
}
