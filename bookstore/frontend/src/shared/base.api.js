import axios from 'axios'

export default class BaseApi {
  url = ''
  api = axios.create({ baseURL: this.url })
  authApi = axios.create({ baseURL: this.url })

  interceptor = (config) => {
    try {
      console.log(config)
      console.log(localStorage.getItem('user'))

      if (config.headers !== undefined) {
        config.headers.authorization = localStorage.getItem('user') || ''
      }

      return config
    } catch (e) {
      return config
    }
  }

  constructor() {
    this.authApi.interceptors.request.use(this.interceptor)
  }
}
