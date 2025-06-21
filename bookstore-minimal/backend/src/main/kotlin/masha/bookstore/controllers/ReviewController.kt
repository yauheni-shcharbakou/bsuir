package masha.bookstore.controllers

import masha.bookstore.dtos.ReviewDto
import masha.bookstore.dtos.DeleteDto
import masha.bookstore.interfaces.IReviewService
import masha.bookstore.interfaces.IBookService
import masha.bookstore.models.Review
import masha.bookstore.shared.Route
import masha.bookstore.shared.Selector
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(Route.REVIEWS)
@CrossOrigin(originPatterns = ["*"])
class ReviewController(
    private val reviewService: IReviewService,
    private val bookService: IBookService
) {

    @GetMapping(Selector.ID)
    fun getOne(@PathVariable id: Int): ReviewDto = reviewService.getOne(id).toDto()

    @PostMapping
    fun create(@RequestBody dto: ReviewDto): ReviewDto {
        return reviewService.create(book = bookService.getOne(dto.book), dto = dto).toDto()
    }

    @PutMapping(Selector.ID)
    fun change(
        @RequestBody dto: ReviewDto,
        @PathVariable id: Int
    ): ReviewDto {
        return reviewService.change(id = id, dto = dto).toDto()
    }

    @DeleteMapping(Selector.ID)
    fun delete(@PathVariable id: Int): DeleteDto {
        val review: Review = reviewService.getOne(id)
        bookService.removeReview(review)
        return DeleteDto(id = reviewService.delete(id))
    }
}