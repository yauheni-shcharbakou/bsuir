import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { StorageKey } from '../constants/enums';
import { API_URL } from '../constants/common';

export default abstract class BaseRepository {
  protected readonly route: string = '/';
  private readonly baseURL: string = API_URL;

  protected readonly api: AxiosInstance = axios.create({ baseURL: this.baseURL });
  protected readonly authApi: AxiosInstance = axios.create({ baseURL: this.baseURL });

  private readonly interceptor = (config: AxiosRequestConfig) => {
    try {
      const savedToken: string | null = localStorage
        ? localStorage.getItem(StorageKey.TOKEN)
        : null;

      if (config.headers && savedToken) {
        config.headers.authorization = `Beaver ${savedToken}`;
      }

      console.log(this.baseURL);

      return config;
    } catch (e) {
      return config;
    }
  };

  constructor() {
    this.authApi.interceptors.request.use(this.interceptor);
  }
}
