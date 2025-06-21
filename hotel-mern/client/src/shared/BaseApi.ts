import { AxiosInstance } from 'axios'
import ApiConfig from './ApiConfig'

export default abstract class BaseApi {
  protected readonly api: AxiosInstance
  protected readonly authApi: AxiosInstance

  public constructor(config: ApiConfig) {
    this.api = config.api
    this.authApi = config.authApi
  }
}
