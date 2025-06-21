import { makeAutoObservable } from 'mobx'

export default class ReviewStore {
  constructor() {
    this._reviews = []
    makeAutoObservable(this)
  }

  setReviews(value) {
    this._reviews = value
  }

  get reviews() {
    return this._reviews
  }

  addReview(review) {
    this._reviews.push(review)
  }

  changeReview(changed) {
    this._reviews = this._reviews.map((review) =>
      review._id === changed._id ? changed : review
    )
  }

  deleteReview(id) {
    this._reviews = this._reviews.filter(({ _id }) => _id !== id)
  }
}
