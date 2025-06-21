import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BACKEND_URL } from '../../constants/common';
import { StorageKey } from '../../constants/enums';

export class BaseRepository {
  protected readonly route: string = '';

  protected get subRoute(): string {
    return `/${this.route}`;
  }

  protected readonly instance: AxiosInstance = axios.create({ baseURL: BACKEND_URL });
  protected readonly authInstance: AxiosInstance = axios.create({ baseURL: BACKEND_URL });

  private get interceptor() {
    return (config: AxiosRequestConfig) => {
      try {
        const savedToken: string | null = localStorage ? localStorage.getItem(StorageKey.TOKEN) : null;

        if (config.headers && savedToken) {
          config.headers.authorization = `Bearer ${savedToken}`;
        }

        return config;
      } catch (e) {
        return config;
      }
    };
  }

  constructor() {
    this.authInstance.interceptors.request.use(this.interceptor);
  }
}
