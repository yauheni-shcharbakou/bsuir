import { AppStore } from '../interfaces/types'
import BaseClient from './BaseClient'
import TypeApi from '../api/type'
import { errorViewer, incorrectHandler } from '../shared/constants'

export default class TypeClient extends BaseClient<TypeApi> {
  loadAll(type: AppStore['type']) {
    this.api
      .getAll()
      .then((types) => type.setTypes(types))
      .catch((e) => console.error(e))
  }

  create(
    places: number,
    name: string,
    services: string[],
    type: AppStore['type'],
    callback: () => void
  ) {
    if (places && !Number.isNaN(places) && name) {
      this.api
        .create(services, name, places)
        .then((response) => {
          type.addType(response)
          callback()
        })
        .catch((e) => errorViewer(e))
    } else {
      incorrectHandler()
    }
  }

  change(
    editedType: string,
    places: number,
    name: string,
    services: string[],
    type: AppStore['type'],
    callback: () => void
  ) {
    if (editedType && places && !Number.isNaN(places) && name) {
      this.api
        .change(editedType, services, name, places)
        .then((response) => {
          type.changeType(response)
          callback()
        })
        .catch((e) => errorViewer(e))
    } else {
      incorrectHandler()
    }
  }

  delete(id: string, type: AppStore['type']) {
    this.api
      .delete(id)
      .then((response) => type.deleteType(response))
      .catch((e) => console.error(e))
  }
}
