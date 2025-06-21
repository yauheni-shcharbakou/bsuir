package masha.bookstore.interfaces

import masha.bookstore.models.*

interface IReviewService : IBaseService<Review> {
    fun create(book: Book, author: String, content: String): Review
    fun change(id: Int, content: String): Review
}