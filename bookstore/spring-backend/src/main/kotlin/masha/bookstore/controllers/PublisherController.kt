package masha.bookstore.controllers

import masha.bookstore.dtos.PublisherDto
import masha.bookstore.interfaces.IBookService
import masha.bookstore.interfaces.IPublisherService
import masha.bookstore.models.Publisher
import masha.bookstore.shared.Auth
import masha.bookstore.shared.Role
import masha.bookstore.shared.Route
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(Route.PUBLISHER)
@CrossOrigin(originPatterns = ["*"])
class PublisherController(
    private val publisherService: IPublisherService,
    private val bookService: IBookService
) {

    @GetMapping
    fun getAll(): List<PublisherDto> = publisherService.getAll().map { it.toDto() }

    @PostMapping
    fun create(
        @RequestBody dto: PublisherDto,
        @RequestHeader("Authorization") authorization: String?
    ): PublisherDto {
        Auth.verify(authorization, Role.ONLY_ADMIN)
        return publisherService.create(name = dto.name, address = dto.address).toDto()
    }

    @PatchMapping
    fun change(
        @RequestBody dto: PublisherDto,
        @RequestHeader("Authorization") authorization: String?
    ): PublisherDto {
        Auth.verify(authorization, Role.ONLY_ADMIN)
        return publisherService
            .change(id = dto.id, name = dto.name, address = dto.address)
            .toDto()
    }

    @DeleteMapping
    fun delete(
        @RequestBody dto: PublisherDto,
        @RequestHeader("Authorization") authorization: String?
    ): Int {
        Auth.verify(authorization, Role.ONLY_ADMIN)
        val publisher: Publisher = publisherService.getOne(dto.id)
        publisher.books.forEach { bookService.delete(it.id) }
        return publisherService.delete(dto.id)
    }
}