import { RoutePath } from './constants'
import AdminPage from '../pages/admin.page'
import AuthorPage from '../pages/author.page'
// import PaymentPage from '../pages/payment.page'
import PublisherPage from '../pages/publisher.page'
import CategoryPage from '../pages/category.page'
// import OrderPage from '../pages/order.page'
// import OfferPage from '../pages/offer.page'
import BookPage from '../pages/book.page'
import AuthPage from '../pages/auth.page'
import ReviewPage from '../pages/review.page'
import MainPage from '../pages/main.page'
// import FavoritePage from '../pages/favorite.page'

export const adminRoutes = [
  {
    path: RoutePath.Admin,
    component: AdminPage,
  },
  {
    path: RoutePath.Author,
    component: AuthorPage,
  },
  // {
  //   path: RoutePath.Payment,
  //   component: PaymentPage,
  // },
  {
    path: RoutePath.Publisher,
    component: PublisherPage,
  },
  {
    path: RoutePath.Category,
    component: CategoryPage,
  },
]

export const authRoutes = [
  // {
  //   path: RoutePath.Order,
  //   component: OrderPage,
  // },
  // {
  //   path: RoutePath.Offer,
  //   component: OfferPage,
  // },
  // {
  //   path: RoutePath.Favorite,
  //   component: FavoritePage,
  // },
]

export const publicRoutes = [
  {
    path: RoutePath.Main,
    component: MainPage,
  },
  {
    path: RoutePath.Register,
    component: AuthPage,
  },
  {
    path: RoutePath.Login,
    component: AuthPage,
  },
  {
    path: RoutePath.Book,
    component: BookPage,
  },
  {
    path: `${RoutePath.Review}/:id`,
    component: ReviewPage,
  },
]
