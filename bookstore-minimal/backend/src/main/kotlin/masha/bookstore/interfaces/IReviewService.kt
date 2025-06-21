package masha.bookstore.interfaces

import masha.bookstore.dtos.ReviewDto
import masha.bookstore.models.*

interface IReviewService : IBaseService<Review> {
    fun create(book: Book, dto: ReviewDto): Review
    fun change(id: Int, dto: ReviewDto): Review
    fun deleteWithBook(book: Book)
}