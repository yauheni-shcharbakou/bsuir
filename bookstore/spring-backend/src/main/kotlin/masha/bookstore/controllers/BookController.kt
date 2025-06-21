package masha.bookstore.controllers

import masha.bookstore.dtos.BookDto
import masha.bookstore.dtos.BookPopulatedDto
import masha.bookstore.interfaces.*
import masha.bookstore.models.Book
import masha.bookstore.shared.Auth
import masha.bookstore.shared.Role
import masha.bookstore.shared.Route
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(Route.BOOK)
@CrossOrigin(originPatterns = ["*"])
class BookController(
    private val authorService: IAuthorService,
    private val bookService: IBookService,
    private val publisherService: IPublisherService,
    private val categoryService: ICategoryService,
    private val reviewService: IReviewService
) {

    @GetMapping
    fun getAll(): List<BookPopulatedDto> = bookService.getAll().map { it.toPopulatedDto() }

    @PostMapping
    fun create(
        @RequestBody dto: BookDto,
        @RequestHeader("Authorization") authorization: String?
    ): BookPopulatedDto {
        Auth.verify(authorization, Role.ONLY_ADMIN)

        val book: Book = bookService.create(
            author = authorService.getOne(dto.author),
            publisher = publisherService.getOne(dto.publisher),
            category = categoryService.getOne(dto.category),
            name = dto.name
        )

        categoryService.addBook(book)
        authorService.addBook(book)
        publisherService.addBook(book)

        return book.toPopulatedDto()
    }

    @PatchMapping
    fun change(
        @RequestBody dto: BookDto,
        @RequestHeader("Authorization") authorization: String?
    ): BookPopulatedDto {
        Auth.verify(authorization, Role.ONLY_ADMIN)

        val book: Book = bookService.getOne(dto.id)

        categoryService.removeBook(book)
        publisherService.removeBook(book)
        authorService.removeBook(book)

        val updatedBook: Book = bookService.change(
            id = book.id,
            author = authorService.getOne(dto.author),
            category = categoryService.getOne(dto.category),
            publisher = publisherService.getOne(dto.publisher),
            name = dto.name
        )

        categoryService.addBook(updatedBook)
        publisherService.addBook(updatedBook)
        authorService.addBook(updatedBook)

        return updatedBook.toPopulatedDto()
    }

    @DeleteMapping
    fun delete(
        @RequestBody dto: BookDto,
        @RequestHeader("Authorization") authorization: String?
    ): Int {
        Auth.verify(authorization, Role.ONLY_ADMIN)

        val book: Book = bookService.getOne(dto.id)

        book.reviews.forEach {
            bookService.removeReview(it)
            reviewService.delete(it.id)
        }

        authorService.removeBook(book)
        categoryService.removeBook(book)
        publisherService.removeBook(book)

        return bookService.delete(book.id)
    }
}