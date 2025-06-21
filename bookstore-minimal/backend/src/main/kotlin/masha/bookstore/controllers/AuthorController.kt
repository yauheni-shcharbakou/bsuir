package masha.bookstore.controllers

import masha.bookstore.dtos.DeleteDto
import masha.bookstore.dtos.AuthorDto
import masha.bookstore.models.Author
import masha.bookstore.shared.Route
import masha.bookstore.shared.Selector
import masha.bookstore.interfaces.IAuthorService
import masha.bookstore.interfaces.IBookService
import masha.bookstore.interfaces.IReviewService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(Route.AUTHORS)
@CrossOrigin(originPatterns = ["*"])
class AuthorController(
    private val reviewService: IReviewService,
    private val bookService: IBookService,
    private val authorService: IAuthorService
) {

    @GetMapping
    fun getAll(): List<AuthorDto> = authorService.getAll().map { it.toDto() }

    @GetMapping(Selector.ID)
    fun getOne(@PathVariable id: Int): AuthorDto = authorService.getOne(id).toDto()

    @PostMapping
    fun create(@RequestBody dto: AuthorDto): AuthorDto = authorService.create(dto).toDto()

    @PutMapping(Selector.ID)
    fun change(
        @RequestBody dto: AuthorDto,
        @PathVariable id: Int
    ): AuthorDto {
        return authorService.change(id = id, dto = dto).toDto()
    }

    @DeleteMapping(Selector.ID)
    fun delete(@PathVariable id: Int): DeleteDto {
        val author: Author = authorService.getOne(id)

        author.books.forEach {
            authorService.removeBook(it)
            reviewService.deleteWithBook(it)
            bookService.delete(it.id)
        }

        return DeleteDto(id = authorService.delete(id))
    }
}