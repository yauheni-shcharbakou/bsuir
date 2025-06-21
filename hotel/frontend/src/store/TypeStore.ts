import { ITypeStore } from '../abstractions/interfaces';
import { makeAutoObservable } from 'mobx';

export default class TypeStore implements ITypeStore {
  private current: number = -1;

  constructor() {
    makeAutoObservable(this);
  }

  getCurrent(): number {
    return this.current;
  }

  setCurrent(typeId: number): void {
    this.current = this.current === typeId ? -1 : typeId;
  }
}
