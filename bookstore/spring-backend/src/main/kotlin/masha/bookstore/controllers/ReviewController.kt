package masha.bookstore.controllers

import masha.bookstore.dtos.ReviewDto
import masha.bookstore.interfaces.IBookService
import masha.bookstore.interfaces.IReviewService
import masha.bookstore.models.Review
import masha.bookstore.shared.Route
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(Route.REVIEW)
@CrossOrigin(originPatterns = ["*"])
class ReviewController(
    private val reviewService: IReviewService,
    private val bookService: IBookService
) {

    @PostMapping
    fun create(@RequestBody dto: ReviewDto): ReviewDto {
        val review = reviewService.create(
            book = bookService.getOne(dto.book),
            author = dto.author,
            content = dto.content
        )

        bookService.addReview(review)
        return review.toDto()
    }

    @PatchMapping
    fun change(@RequestBody dto: ReviewDto): ReviewDto {
        return reviewService.change(id = dto.id, content = dto.content).toDto()
    }

    @DeleteMapping
    fun delete(@RequestBody dto: ReviewDto): Int {
        val review: Review = reviewService.getOne(dto.id)
        bookService.removeReview(review)
        return reviewService.delete(dto.id)
    }
}