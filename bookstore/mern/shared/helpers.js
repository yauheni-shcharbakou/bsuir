import {
  bookService,
  offerService,
  orderService,
  reviewService,
  userService,
} from '../services/index.js'

export function testEmail(email) {
  const arr = email.split(/[@.]/)
  return arr.length >= 3
}

export async function errorHandler(callback, next) {
  try {
    await callback()
  } catch (e) {
    return next(e.message)
  }
}

export async function deleteBooks(query) {
  const books = await bookService.getByQuery(query)

  books.map(async (book) => {
    book._reviews.map(async (reviewId) => await reviewService.delete(reviewId))
    await orderService.deleteWithBook(book._id)
    await offerService.deleteWithBook(book._id)
    await userService.removeBook(book._id)
    await bookService.delete(book._id)
  })
}
