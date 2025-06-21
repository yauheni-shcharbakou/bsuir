package masha.bookstore.controllers

import masha.bookstore.dtos.CategoryDto
import masha.bookstore.interfaces.IBookService
import masha.bookstore.interfaces.ICategoryService
import masha.bookstore.models.Category
import masha.bookstore.shared.Auth
import masha.bookstore.shared.Role
import masha.bookstore.shared.Route
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(Route.CATEGORY)
@CrossOrigin(originPatterns = ["*"])
class CategoryController(
    private val categoryService: ICategoryService,
    private val bookService: IBookService
) {

    @GetMapping
    fun getAll(): List<CategoryDto> = categoryService.getAll().map { it.toDto() }

    @PostMapping
    fun create(
        @RequestBody dto: CategoryDto,
        @RequestHeader("Authorization") authorization: String?
    ): CategoryDto {
        Auth.verify(authorization, Role.ONLY_ADMIN)
        return categoryService.create(dto.name).toDto()
    }

    @PatchMapping
    fun change(
        @RequestBody dto: CategoryDto,
        @RequestHeader("Authorization") authorization: String?
    ): CategoryDto {
        Auth.verify(authorization, Role.ONLY_ADMIN)
        return categoryService.change(id = dto.id, name = dto.name).toDto()
    }

    @DeleteMapping
    fun delete(
        @RequestBody dto: CategoryDto,
        @RequestHeader("Authorization") authorization: String?
    ): Int {
        Auth.verify(authorization, Role.ONLY_ADMIN)
        val category: Category = categoryService.getOne(dto.id)
        category.books.forEach { bookService.delete(it.id) }
        return categoryService.delete(dto.id)
    }
}