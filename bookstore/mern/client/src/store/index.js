import { createContext } from 'react'
import UserStore from './user.store'
import SessionStore from './session.store'
import AuthorStore from './author.store'
import PublisherStore from './publisher.store'
import PaymentStore from './payment.store'
import CategoryStore from './category.store'
import BookStore from './book.store'
import ReviewStore from './review.store'
import OfferStore from './offer.store'
import OrderStore from './order.store'

export const store = {
  user: new UserStore(),
  session: new SessionStore(),
  author: new AuthorStore(),
  publisher: new PublisherStore(),
  payment: new PaymentStore(),
  category: new CategoryStore(),
  book: new BookStore(),
  review: new ReviewStore(),
  offer: new OfferStore(),
  order: new OrderStore(),
}

export const Context = createContext({})
