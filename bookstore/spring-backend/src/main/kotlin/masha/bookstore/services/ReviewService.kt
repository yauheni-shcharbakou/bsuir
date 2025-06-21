package masha.bookstore.services

import masha.bookstore.core.BaseService
import masha.bookstore.models.*
import masha.bookstore.interfaces.IReviewService
import masha.bookstore.repositories.ReviewRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ReviewService(
    @Autowired override val repository: ReviewRepository
) : BaseService<Review, ReviewRepository>(repository), IReviewService {

    override fun create(book: Book, author: String, content: String): Review {
        val review = Review(book, author, content)
        repository.save(review)
        return review
    }

    override fun change(id: Int, content: String): Review {
        val review: Review = getOne(id)
        review.content = content
        repository.save(review)
        return review
    }
}