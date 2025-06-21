import { TokenModel } from './models';

export interface IErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface IEditStore {
  getIsEdit(): boolean;
  getId(): number;
  setEdited(id?: number): void;
}

export interface IAuthStore {
  isAuth: boolean;
  isAdminObserved: boolean;
  getUserData(): TokenModel | undefined;
  getIsAuth(): boolean;
  isAdmin(): boolean;
  setUserData(tokenData?: TokenModel): void;
  setIsAuth(isAuth: boolean): void;
}

export interface IBuildingStore {
  getCurrent(): number;
  setCurrent(buildingId: number): void;
}

export interface ITypeStore {
  getCurrent(): number;
  setCurrent(typeId: number): void;
}

export interface IStore {
  editStore: IEditStore;
  authStore: IAuthStore;
  buildingStore: IBuildingStore;
  typeStore: ITypeStore;
}

export interface IRoomRequestConfig {
  buildingId?: number;
  typeId?: number;
  page?: number;
  limit?: number;
  isFree?: boolean;
}

export interface IIterableObject {
  [key: string]: any;
}
