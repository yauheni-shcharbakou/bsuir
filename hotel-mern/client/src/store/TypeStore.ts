import { action, computed, makeObservable, observable } from 'mobx'
import { Type } from '../interfaces/models'

export default class TypeStore {
  @observable private _types: Type[] = []
  @observable private _active: string = ''
  @observable private _checked: string = ''

  constructor() {
    makeObservable(this)
  }

  @action
  setTypes(value: Type[]) {
    this._types = value
  }

  @action
  addType(type: Type) {
    this._types.push(type)
  }

  @action
  changeType(updatedType: Type) {
    this._types = this._types.map((type) =>
      type._id === updatedType._id ? updatedType : type
    )
  }

  @action
  deleteType(id: string) {
    this._types = this._types.filter(({ _id }) => _id !== id)
  }

  @action
  setActive(id: string) {
    this._active = id
  }

  @action
  setChecked(value: string) {
    this._checked = value
  }

  @computed
  get types() {
    return this._types
  }

  @computed
  get active() {
    return this._active
  }

  @computed
  get checked() {
    return this._checked
  }
}
