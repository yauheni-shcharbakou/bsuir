import UserApi from './user.api'
import SessionApi from './session.api'
import PaymentApi from './payment.api'
import PublisherApi from './publisher.api'
import CategoryApi from './category.api'
import AuthorApi from './author.api'
import BookApi from './book.api'
import ReviewApi from './review.api'
import OfferApi from './offer.api'
import OrderApi from './order.api'

export const userApi = new UserApi()
export const sessionApi = new SessionApi()
export const paymentApi = new PaymentApi()
export const publisherApi = new PublisherApi()
export const categoryApi = new CategoryApi()
export const authorApi = new AuthorApi()
export const bookApi = new BookApi()
export const reviewApi = new ReviewApi()
export const offerApi = new OfferApi()
export const orderApi = new OrderApi()
