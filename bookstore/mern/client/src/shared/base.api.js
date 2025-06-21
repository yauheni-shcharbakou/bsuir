import axios from 'axios'

export default class BaseApi {
  url = '/api'
  api = axios.create({ baseURL: this.url })
  authApi = axios.create({ baseURL: this.url })

  interceptor = (config) => {
    if (config.headers !== undefined) {
      config.headers.authorization = localStorage.getItem('user') || ''
    }

    return config
  }

  constructor() {
    this.authApi.interceptors.request.use(this.interceptor)
  }
}
