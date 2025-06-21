package masha.bookstore.interfaces

import masha.bookstore.dtos.AuthorDto
import masha.bookstore.models.*

interface IAuthorService : IBaseService<Author> {
    fun create(dto: AuthorDto): Author
    fun change(id: Int, dto: AuthorDto): Author
    fun addBook(book: Book)
    fun removeBook(book: Book)
}