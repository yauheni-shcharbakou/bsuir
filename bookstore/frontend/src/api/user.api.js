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
    localStorage.setItem('user', `${data.id} ${data.role}`)
    return data
  }

  async login(email, password) {
    const { data } = await this.api.post(`${this.url}/login`, {
      email,
      password,
    })
    localStorage.setItem('user', `${data.id} ${data.role}`)
    return data
  }

  async auth() {
    try {
      const { data } = await this.authApi.post(`${this.url}/auth`)
      localStorage.setItem('user', `${data.id} ${data.role}`)
      return data
    } catch (e) {
      return null
    }
  }

  // async getBooks(_id) {
  //   return (await this.api.get(`${this.url}/book`, { params: { _id } })).data
  // }

  // async changeBooks(_id, _books) {
  //   return (await this.api.patch(`${this.url}/book`, { _id, _books })).data
  // }

  async changeRole(id, role) {
    return (await this.authApi.patch(`${this.url}/role`, { id, role })).data
  }

  async delete(id) {
    return (await this.authApi.delete(this.url, { data: { id } })).data
  }
}
