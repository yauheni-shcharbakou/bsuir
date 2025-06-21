import { makeAutoObservable } from 'mobx'

export default class PublisherStore {
  constructor() {
    this._publishers = []
    makeAutoObservable(this)
  }

  setPublishers(value) {
    this._publishers = value
  }

  get publishers() {
    return this._publishers
  }

  addPublisher(publisher) {
    this._publishers.push(publisher)
  }

  changePublisher(changed) {
    this._publishers = this._publishers.map((publisher) =>
      publisher._id === changed._id ? changed : publisher
    )
  }

  deletePublisher(id) {
    this._publishers = this._publishers.filter(({ _id }) => _id !== id)
  }
}
