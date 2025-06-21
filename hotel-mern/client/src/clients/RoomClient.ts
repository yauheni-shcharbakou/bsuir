import { AppStore } from '../interfaces/types'
import BaseClient from './BaseClient'
import RoomApi from '../api/room'
import { roles } from '../shared/enums'
import { errorViewer, incorrectHandler } from '../shared/constants'

export default class RoomClient extends BaseClient<RoomApi> {
  loadAll(room: AppStore['room']) {
    this.api
      .get(room.page, room.limit)
      .then((response) => {
        room.setRooms(response.rooms)
        room.setPageAmount(response.amount)
      })
      .catch((e) => console.error(e))
  }

  updateAll(
    page: number,
    room: AppStore['room'],
    building: AppStore['building'],
    type: AppStore['type'],
    user: AppStore['user'],
    callback?: () => void
  ) {
    this.api
      .get(
        page,
        room.limit,
        building.active,
        type.active,
        user.user.role === roles.client ? true : undefined
      )
      .then((response) => {
        room.setRooms(response.rooms)
        room.setPageAmount(response.amount)

        if (callback) {
          callback()
        }
      })
      .catch((e) => console.error(e))
  }

  create(checkedBuilding: string, checkedType: string, loadRooms: () => void) {
    if (checkedBuilding && checkedType) {
      this.api
        .create(checkedBuilding, checkedType)
        .then(() => loadRooms())
        .catch((e) => errorViewer(e))
    } else {
      incorrectHandler()
    }
  }

  change(checkedBuilding: string, checkedType: string, room: AppStore['room']) {
    if (room.editedRoom && checkedBuilding && checkedType) {
      this.api
        .change(room.editedRoom, checkedBuilding, checkedType)
        .then((response) => {
          room.changeRoom(response)
          room.setEditedRoom('')
          room.toggleIsEdit()
        })
        .catch((e) => errorViewer(e))
    } else {
      incorrectHandler()
    }
  }

  delete(id: string, room: AppStore['room']) {
    this.api
      .delete(id)
      .then((response) => room.deleteRoom(response))
      .catch((e) => console.error(e))
  }
}
