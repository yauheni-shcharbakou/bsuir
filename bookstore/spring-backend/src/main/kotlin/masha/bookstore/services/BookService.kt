package masha.bookstore.services

import masha.bookstore.core.BaseService
import masha.bookstore.models.*
import masha.bookstore.interfaces.IBookService
import masha.bookstore.repositories.BookRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class BookService(
    @Autowired override val repository: BookRepository
) : BaseService<Book, BookRepository>(repository), IBookService {

    override fun create(
        author: Author,
        publisher: Publisher,
        category: Category,
        name: String
    ): Book {
        val book = Book(
            author = author,
            publisher = publisher,
            category = category,
            name = name
        )
        repository.save(book)
        return book
    }

    override fun change(
        id: Int,
        author: Author,
        publisher: Publisher,
        category: Category,
        name: String
    ): Book {
        val book = getOne(id)

        book.author = author
        book.publisher = publisher
        book.category = category
        book.name = name

        repository.save(book)
        return book
    }

    override fun addReview(review: Review) {
        review.book.let {
            it.reviews.add(review)
            repository.save(it)
        }
    }

    override fun removeReview(review: Review) {
        review.book.let {
            it.reviews.remove(review)
            repository.save(it)
        }
    }
}