import { makeAutoObservable } from 'mobx';
import { IModalStore } from '../abstractions/interfaces';
import { ModalName } from '../shared/enums';

export default class ModalStore implements IModalStore {
  private isOpenedValue: boolean = false;
  private name: ModalName = ModalName.SETTINGS;

  constructor() {
    makeAutoObservable(this);
  }

  get isOpened(): boolean {
    return this.isOpenedValue;
  }

  toggle(): void {
    this.isOpenedValue = !this.isOpenedValue;
  }

  getName(): ModalName {
    return this.name;
  }

  setName(name: ModalName): void {
    this.name = name;
  }
}
