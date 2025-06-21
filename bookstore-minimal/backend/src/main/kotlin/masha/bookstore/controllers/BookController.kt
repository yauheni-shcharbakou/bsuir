package masha.bookstore.controllers

import masha.bookstore.dtos.ReviewDto
import masha.bookstore.dtos.DeleteDto
import masha.bookstore.dtos.BookDto
import masha.bookstore.dtos.BookPopulatedDto
import masha.bookstore.models.*
import masha.bookstore.shared.*
import masha.bookstore.interfaces.IAuthorService
import masha.bookstore.interfaces.IBookService
import masha.bookstore.interfaces.IReviewService
import masha.bookstore.shared.Route
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(Route.BOOKS)
@CrossOrigin(originPatterns = ["*"])
class BookController(
    private val reviewService: IReviewService,
    private val bookService: IBookService,
    private val authorService: IAuthorService,
) {

    @GetMapping
    fun getAll(): List<BookPopulatedDto> = bookService.getAll().map { it.toPopulatedDto() }

    @GetMapping(Selector.ID)
    fun getOne(@PathVariable id: Int): BookPopulatedDto = bookService.getOne(id).toPopulatedDto()

    @GetMapping("${Selector.BOOK_ID}/reviews")
    fun getRoomComments(@PathVariable bookId: Int): List<ReviewDto> {
        return bookService.getOne(bookId).reviews.map { it.toDto() }
    }

    @PostMapping
    fun create(@RequestBody dto: BookDto): BookPopulatedDto {
        val book: Book = bookService.create(
            author = authorService.getOne(dto.author),
            dto = dto
        )

        authorService.addBook(book)
        return book.toPopulatedDto()
    }

    @PutMapping(Selector.ID)
    fun change(
        @RequestBody dto: BookDto,
        @RequestParam status: String?,
        @PathVariable id: Int
    ): BookPopulatedDto {
        authorService.removeBook(bookService.getOne(id))

        val book: Book = bookService.change(
            id = id,
            author = authorService.getOne(dto.author),
            dto = dto
        )

        authorService.addBook(book)
        return book.toPopulatedDto()
    }

    @DeleteMapping(Selector.ID)
    fun delete(@PathVariable id: Int): DeleteDto {
        val book: Book = bookService.getOne(id)

        authorService.removeBook(book)
        reviewService.deleteWithBook(book)

        return DeleteDto(id = bookService.delete(book.id))
    }
}
