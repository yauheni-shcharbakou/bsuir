import { makeAutoObservable } from 'mobx'

export default class UserStore {
  constructor() {
    this._isAuth = false
    this._user = {}
    this._users = []
    makeAutoObservable(this)
  }

  setIsAuth(value) {
    this._isAuth = value
  }

  setUser(value) {
    this._user = value
  }

  setUsers(value) {
    this._users = value
  }

  deleteUser(id) {
    this._users = this._users.filter(({ _id }) => _id !== id)
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }

  get users() {
    return this._users
  }

  changeUser(changed) {
    this._users = this._users.map((user) =>
      user._id === changed._id ? changed : user
    )
  }
}
