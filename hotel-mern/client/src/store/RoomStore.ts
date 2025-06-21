import { action, computed, makeObservable, observable } from 'mobx'
import { RoomPopulated } from '../interfaces/populatedModels'

export default class RoomStore {
  @observable private _rooms: RoomPopulated[] = []
  @observable private _current: RoomPopulated = {} as RoomPopulated
  @observable private _pageAmount = 1
  @observable private _page = 1
  @observable private _isEdit = false
  @observable private _editedRoom = ''
  private readonly _limit = 9

  constructor() {
    makeObservable(this)
  }

  @action
  setRooms(value: RoomPopulated[]) {
    this._rooms = value
  }

  @action
  addRoom(room: RoomPopulated) {
    this._rooms.push(room)
  }

  @action
  changeRoom(updatedRoom: RoomPopulated) {
    this._rooms = this._rooms.map((r) =>
      r._id === this._editedRoom ? updatedRoom : r
    )
  }

  @action
  toggleIsEdit() {
    this._isEdit = !this._isEdit
  }

  @action
  setEditedRoom(id: string) {
    this._editedRoom = id
  }

  @action
  deleteRoom(id: string) {
    this._rooms = this._rooms.filter(({ _id }) => _id !== id)
  }

  @action
  setCurrent(room: RoomPopulated) {
    this._current = room
  }

  @action
  setPage(value: number) {
    this._page = value
  }

  @action
  setPageAmount(roomAmount: number) {
    this._pageAmount = Math.ceil(roomAmount / this._limit)
  }

  @computed
  get rooms() {
    return this._rooms
  }

  @computed
  get current() {
    return this._current
  }

  @computed
  get pageAmount() {
    return this._pageAmount
  }

  @computed
  get page() {
    return this._page
  }

  @computed
  get isEdit() {
    return this._isEdit
  }

  @computed
  get editedRoom() {
    return this._editedRoom
  }

  get limit() {
    return this._limit
  }
}
