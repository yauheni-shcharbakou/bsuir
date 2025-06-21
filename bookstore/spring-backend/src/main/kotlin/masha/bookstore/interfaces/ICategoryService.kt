package masha.bookstore.interfaces

import masha.bookstore.models.*

interface ICategoryService : IBaseService<Category> {
    fun create(name: String): Category
    fun change(id: Int, name: String): Category
    fun addBook(book: Book)
    fun removeBook(book: Book)
}