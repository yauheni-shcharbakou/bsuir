package masha.bookstore.controllers

import masha.bookstore.dtos.AuthorDto
import masha.bookstore.interfaces.IAuthorService
import masha.bookstore.interfaces.IBookService
import masha.bookstore.models.Author
import masha.bookstore.shared.Auth
import masha.bookstore.shared.Role
import masha.bookstore.shared.Route
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(Route.AUTHOR)
@CrossOrigin(originPatterns = ["*"])
class AuthorController(
    private val authorService: IAuthorService,
    private val bookService: IBookService
) {

    @GetMapping
    fun getAll(): List<AuthorDto> = authorService.getAll().map { it.toDto() }

    @PostMapping
    fun create(
        @RequestBody dto: AuthorDto,
        @RequestHeader("Authorization") authorization: String?
    ): AuthorDto {
        Auth.verify(authorization, Role.ONLY_ADMIN)
        return authorService.create(dto.name).toDto()
    }

    @PatchMapping
    fun change(
        @RequestBody dto: AuthorDto,
        @RequestHeader("Authorization") authorization: String?
    ): AuthorDto {
        Auth.verify(authorization, Role.ONLY_ADMIN)
        return authorService.change(dto.id, dto.name).toDto()
    }

    @DeleteMapping
    fun delete(
        @RequestBody dto: AuthorDto,
        @RequestHeader("Authorization") authorization: String?
    ): Int {
        Auth.verify(authorization, Role.ONLY_ADMIN)
        val author: Author = authorService.getOne(dto.id)
        author.books.forEach { bookService.delete(it.id) }
        return authorService.delete(dto.id)
    }
}