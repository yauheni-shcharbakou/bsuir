import { makeAutoObservable } from 'mobx'

export default class SessionStore {
  constructor() {
    this._sessions = []
    makeAutoObservable(this)
  }

  setSessions(value) {
    this._sessions = value
  }

  get sessions() {
    return this._sessions
  }
}
