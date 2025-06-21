package masha.bookstore.services

import masha.bookstore.core.BaseService
import masha.bookstore.dtos.ReviewDto
import masha.bookstore.interfaces.IReviewService
import masha.bookstore.models.Review
import masha.bookstore.models.Book
import masha.bookstore.repositories.ReviewRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ReviewService(
    @Autowired override val repository: ReviewRepository
) : BaseService<Review, ReviewRepository>(repository), IReviewService {

    override fun create(book: Book, dto: ReviewDto): Review {
        val review = Review(book = book, author = dto.author, description = dto.description)
        repository.save(review)
        return review
    }

    override fun change(id: Int, dto: ReviewDto): Review {
        val review: Review = getOne(id)
        review.author = dto.author
        review.description = dto.description
        repository.save(review)
        return review
    }

    override fun deleteWithBook(book: Book) {
        repository.deleteAll(book.reviews)
    }
}