import { makeAutoObservable } from 'mobx';
import { IAuthStore } from '../abstractions/interfaces';
import { TokenModel } from '../abstractions/models';
import { Role } from '../constants/enums';

export default class AuthStore implements IAuthStore {
  private userData: TokenModel | undefined;
  private isAuthValue = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuth(): boolean {
    return this.isAuthValue;
  }

  get isAdminObserved(): boolean {
    return this.isAdmin();
  }

  getUserData(): TokenModel | undefined {
    return this.userData;
  }

  setUserData(tokenData?: TokenModel): void {
    this.userData = tokenData;
  }

  getIsAuth(): boolean {
    return this.isAuthValue;
  }

  isAdmin(): boolean {
    return !!this.userData && this.userData.role === Role.ADMIN;
  }

  setIsAuth(isAuth: boolean): void {
    this.isAuthValue = isAuth;
  }
}
