import { makeAutoObservable } from 'mobx'

export default class OfferStore {
  constructor() {
    this._offers = []
    makeAutoObservable(this)
  }

  setOffers(value) {
    this._offers = value
  }

  get offers() {
    return this._offers
  }

  addOffer(offer) {
    this._offers.push(offer)
  }

  changeOffer(changed) {
    this._offers = this._offers.map((offer) =>
      offer._id === changed._id ? changed : offer
    )
  }

  deleteOffer(id) {
    this._offers = this._offers.filter(({ _id }) => _id !== id)
  }
}
