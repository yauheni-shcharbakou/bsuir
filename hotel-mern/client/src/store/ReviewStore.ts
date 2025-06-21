import { action, computed, makeObservable, observable } from 'mobx'
import { Review } from '../interfaces/models'

export default class ReviewStore {
  @observable private _reviews: Review[] = []

  constructor() {
    makeObservable(this)
  }

  @action
  setReviews(value: Review[]) {
    this._reviews = value
  }

  @action
  addReview(review: Review) {
    this._reviews.push(review)
  }

  @action
  changeReview(updatedReview: Review) {
    this._reviews = this._reviews.map((review) =>
      review._id === updatedReview._id ? updatedReview : review
    )
  }

  @action
  deleteReview(id: string) {
    this._reviews = this._reviews.filter(({ _id }) => _id !== id)
  }

  @computed
  get reviews() {
    return this._reviews
  }
}
