import UserController from './user.controller.js'
import AuthorController from './author.controller.js'
import PublisherController from './publisher.controller.js'
import OrderController from './order.controller.js'
import OfferController from './offer.controller.js'
import CategoryController from './category.controller.js'
import BookController from './book.controller.js'
import ReviewController from './review.controller.js'
import PaymentController from './payment.controller.js'
import SessionController from './session.controller.js'

export const userController = new UserController()
export const authorController = new AuthorController()
export const bookController = new BookController()
export const categoryController = new CategoryController()
export const offerController = new OfferController()
export const orderController = new OrderController()
export const publisherController = new PublisherController()
export const reviewController = new ReviewController()
export const paymentController = new PaymentController()
export const sessionController = new SessionController()
