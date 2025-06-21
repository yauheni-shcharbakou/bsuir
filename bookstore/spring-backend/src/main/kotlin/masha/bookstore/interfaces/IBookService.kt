package masha.bookstore.interfaces

import masha.bookstore.models.*

interface IBookService : IBaseService<Book> {
    fun create(
        author: Author,
        publisher: Publisher,
        category: Category,
        name: String
    ): Book

    fun change(
        id: Int,
        author: Author,
        publisher: Publisher,
        category: Category,
        name: String
    ): Book

    fun addReview(review: Review)
    fun removeReview(review: Review)
}