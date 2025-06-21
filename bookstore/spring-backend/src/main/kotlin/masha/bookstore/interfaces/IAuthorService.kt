package masha.bookstore.interfaces

import masha.bookstore.models.*

interface IAuthorService : IBaseService<Author> {
    fun create(name: String): Author
    fun change(id: Int, name: String): Author
    fun addBook(book: Book)
    fun removeBook(book: Book)
}