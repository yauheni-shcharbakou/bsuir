package masha.bookstore.interfaces

import masha.bookstore.dtos.BookDto
import masha.bookstore.models.*

interface IBookService : IBaseService<Book> {
    fun create(author: Author, dto: BookDto): Book
    fun change(id: Int, author: Author, dto: BookDto): Book
    fun addReview(review: Review)
    fun removeReview(review: Review)
}