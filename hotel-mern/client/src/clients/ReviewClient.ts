import { AppStore } from '../interfaces/types'
import BaseClient from './BaseClient'
import { errorViewer, incorrectHandler } from '../shared/constants'
import ReviewApi from '../api/review'

export default class ReviewClient extends BaseClient<ReviewApi> {
  loadAll(review: AppStore['review'], room: AppStore['room']) {
    this.api
      .getAll(room.current._id)
      .then((response) => review.setReviews(response))
      .catch((e) => console.error(e))
  }

  create(
    content: string,
    review: AppStore['review'],
    room: AppStore['room'],
    user: AppStore['user'],
    callback: () => void
  ) {
    if (user.isAuth && content) {
      this.api
        .create(room.current._id, user.user.email, content)
        .then((response) => {
          review.addReview(response)
          callback()
        })
        .catch((e) => errorViewer(e))
    } else {
      incorrectHandler()
    }
  }

  change(
    content: string,
    current: string,
    review: AppStore['review'],
    user: AppStore['user'],
    callback: () => void
  ) {
    if (user.isAuth && content) {
      this.api
        .change(current, content)
        .then((response) => {
          review.changeReview(response)
          callback()
        })
        .catch((e) => errorViewer(e))
    } else {
      incorrectHandler()
    }
  }

  delete(id: string, review: AppStore['review']) {
    this.api
      .delete(id)
      .then((response) => review.deleteReview(response))
      .catch((e) => console.error(e))
  }
}
