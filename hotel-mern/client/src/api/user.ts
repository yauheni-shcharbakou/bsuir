import jwtDecode from 'jwt-decode'
import BaseApi from '../shared/BaseApi'
import { ConvertedUserResponse, UserResponse } from '../interfaces/responses'
import { User } from '../interfaces/models'
import { roles } from '../shared/enums'

export default class UserApi extends BaseApi {
  private readonly route = '/user'
  private readonly alias = {
    register: '/register',
    login: '/login',
    auth: '/auth',
  }

  async getAll(): Promise<User[]> {
    return (await this.authApi.get<User[]>(this.route)).data
  }

  async register(
    email: string,
    password: string
  ): Promise<ConvertedUserResponse> {
    const { data } = await this.api.post<UserResponse>(
      this.route + this.alias.register,
      {
        email,
        password,
      }
    )
    localStorage.setItem('token', data.token)
    return { user: jwtDecode(data.token), id: data.id }
  }

  async login(email: string, password: string): Promise<ConvertedUserResponse> {
    const { data } = await this.api.post<UserResponse>(
      this.route + this.alias.login,
      {
        email,
        password,
      }
    )
    localStorage.setItem('token', data.token)
    return { user: jwtDecode(data.token), id: data.id }
  }

  async auth(): Promise<ConvertedUserResponse> {
    const { data } = await this.authApi.post<UserResponse>(
      this.route + this.alias.auth
    )
    localStorage.setItem('token', data.token)
    return { user: jwtDecode(data.token), id: data.id }
  }

  async changeRole(_id: string, role: roles): Promise<roles> {
    return (await this.authApi.patch<roles>(this.route, { _id, role })).data
  }

  async delete(_id: string): Promise<string> {
    return (await this.authApi.delete<string>(this.route, { data: { _id } }))
      .data
  }
}
