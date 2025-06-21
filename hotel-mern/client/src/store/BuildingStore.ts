import { action, computed, makeObservable, observable } from 'mobx'
import { Building } from '../interfaces/models'

export default class BuildingStore {
  @observable private _buildings: Building[] = []
  @observable private _active = ''

  constructor() {
    makeObservable(this)
  }

  @action
  setBuildings(value: Building[]) {
    this._buildings = value
  }

  @action
  addBuilding(building: Building) {
    this._buildings.push(building)
  }

  @action
  changeBuilding(updatedBuilding: Building) {
    this._buildings = this._buildings.map((building) =>
      building._id === updatedBuilding._id ? updatedBuilding : building
    )
  }

  @action
  deleteBuilding(id: string) {
    this._buildings = this._buildings.filter(({ _id }) => _id !== id)
  }

  @action
  setActive(id: string) {
    this._active = id
  }

  @computed
  get buildings() {
    return this._buildings
  }

  @computed
  get active() {
    return this._active
  }
}
