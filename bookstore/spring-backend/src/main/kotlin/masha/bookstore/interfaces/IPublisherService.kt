package masha.bookstore.interfaces

import masha.bookstore.models.*

interface IPublisherService : IBaseService<Publisher> {
    fun create(name: String, address: String): Publisher
    fun change(id: Int, name: String, address: String): Publisher
    fun addBook(book: Book)
    fun removeBook(book: Book)
}