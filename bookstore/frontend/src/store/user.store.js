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

  deleteUser(userId) {
    this._users = this._users.filter(({ id }) => id !== userId)
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
    this._users = this._users.map((user) => (user.id === changed.id ? changed : user))
  }
}
