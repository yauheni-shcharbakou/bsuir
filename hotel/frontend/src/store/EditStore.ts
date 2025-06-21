import { makeAutoObservable } from 'mobx';
import { IEditStore } from '../abstractions/interfaces';

export default class EditStore implements IEditStore {
  private isEdit: boolean = false;
  private id: number = -1;

  constructor() {
    makeAutoObservable(this);
  }

  getIsEdit(): boolean {
    return this.isEdit;
  }

  getId(): number {
    return this.id;
  }

  setEdited(id: number = -1): void {
    this.isEdit = id > -1;
    this.id = id;
  }
}
