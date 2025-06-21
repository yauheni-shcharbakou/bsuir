import BaseApi from '../shared/base.api'

export default class UserApi extends BaseApi {
  url = '/user'

  async getAll() {
    return (await this.authApi.get(this.url)).data
  }

  async register(email, password, isSalesman = false) {
    const { data } = await this.api.post(`${this.url}/register`, {
      email,
      password,
      role: isSalesman ? 'salesman' : 'customer',
    })
    localStorage.setItem('user', JSON.stringify(data))
    return data
  }

  async login(email, password) {
    const { data } = await this.api.post(`${this.url}/login`, {
      email,
      password,
    })
    localStorage.setItem('user', JSON.stringify(data))
    return data
  }

  async auth() {
    const savedUser = JSON.parse(localStorage.getItem('user'))
    const { data } = await this.api.post(`${this.url}/auth`, {
      email: savedUser.email,
    })
    localStorage.setItem('user', JSON.stringify(data))
    return data
  }

  async getBooks(_id) {
    return (await this.api.get(`${this.url}/book`, { params: { _id } })).data
  }

  async changeBooks(_id, _books) {
    return (await this.api.patch(`${this.url}/book`, { _id, _books })).data
  }

  async changeRole(_id, role) {
    return (await this.authApi.patch(`${this.url}/role`, { _id, role })).data
  }

  async delete(_id) {
    return (await this.authApi.delete(this.url, { data: { _id } })).data
  }
}
