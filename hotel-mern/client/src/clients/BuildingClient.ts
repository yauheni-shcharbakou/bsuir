import { AppStore } from '../interfaces/types'
import BaseClient from './BaseClient'
import BuildingApi from '../api/building'
import { errorViewer, incorrectHandler } from '../shared/constants'

export default class BuildingClient extends BaseClient<BuildingApi> {
  loadAll(building: AppStore['building']) {
    this.api
      .getAll()
      .then((buildings) => building.setBuildings(buildings))
      .catch((e) => console.error(e))
  }

  create(
    address: string,
    building: AppStore['building'],
    callback: () => void
  ) {
    if (address) {
      this.api
        .create(address)
        .then((response) => {
          building.addBuilding(response)
          callback()
        })
        .catch((e) => errorViewer(e))
    } else {
      incorrectHandler()
    }
  }

  change(
    editedBuilding: string,
    address: string,
    building: AppStore['building'],
    callback: () => void
  ) {
    if (editedBuilding && address) {
      this.api
        .change(editedBuilding, address)
        .then((response) => {
          building.changeBuilding(response)
          callback()
        })
        .catch((e) => errorViewer(e))
    } else {
      incorrectHandler()
    }
  }

  delete(id: string, building: AppStore['building']) {
    this.api
      .delete(id)
      .then((response) => building.deleteBuilding(response))
      .catch((e) => console.error(e))
  }
}
