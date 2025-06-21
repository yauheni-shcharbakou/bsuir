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
      publisher.id === changed.id ? changed : publisher
    )
  }

  deletePublisher(publisherId) {
    this._publishers = this._publishers.filter(({ id }) => id !== publisherId)
  }
}
