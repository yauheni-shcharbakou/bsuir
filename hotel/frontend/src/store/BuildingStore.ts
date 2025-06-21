import { IBuildingStore } from '../abstractions/interfaces';
import { makeAutoObservable } from 'mobx';

export default class BuildingStore implements IBuildingStore {
  private current: number = -1;

  constructor() {
    makeAutoObservable(this);
  }

  getCurrent(): number {
    return this.current;
  }

  setCurrent(buildingId: number): void {
    this.current = this.current === buildingId ? -1 : buildingId;
  }
}
