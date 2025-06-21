import UserService from './user.service.js'
import OfferService from './offer.service.js'
import OrderService from './order.service.js'
import BookService from './book.service.js'
import SessionService from './session.service.js'
import PaymentService from './payment.service.js'
import AuthorService from './author.service.js'
import ReviewService from './review.service.js'
import PublisherService from './publisher.service.js'
import CategoryService from './category.service.js'

export const userService = new UserService()
export const offerService = new OfferService()
export const orderService = new OrderService()
export const bookService = new BookService()
export const sessionService = new SessionService()
export const paymentService = new PaymentService()
export const authorService = new AuthorService()
export const reviewService = new ReviewService()
export const publisherService = new PublisherService()
export const categoryService = new CategoryService()
