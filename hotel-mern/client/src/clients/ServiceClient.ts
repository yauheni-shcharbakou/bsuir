import { AppStore } from '../interfaces/types'
import BaseClient from './BaseClient'
import ServiceApi from '../api/service'
import { errorViewer, incorrectHandler } from '../shared/constants'

export default class ServiceClient extends BaseClient<ServiceApi> {
  loadAll(service: AppStore['service']) {
    this.api
      .getAll()
      .then((services) => service.setServices(services))
      .catch((e) => console.error(e))
  }

  create(
    name: string,
    price: number,
    service: AppStore['service'],
    callback: () => void
  ) {
    if (name && price && !Number.isNaN(price)) {
      this.api
        .create(name, price)
        .then((response) => {
          service.addService(response)
          callback()
        })
        .catch((e) => errorViewer(e))
    } else {
      incorrectHandler()
    }
  }

  change(
    editedService: string,
    name: string,
    price: number,
    service: AppStore['service'],
    callback: () => void
  ) {
    if (editedService && name && price && !Number.isNaN(price)) {
      this.api
        .change(editedService, name, price)
        .then((response) => {
          service.changeService(response)
          callback()
        })
        .catch((e) => errorViewer(e))
    } else {
      incorrectHandler()
    }
  }

  delete(id: string, service: AppStore['service']) {
    this.api
      .delete(id)
      .then((response) => service.deleteService(response))
      .catch((e) => console.error(e))
  }
}
