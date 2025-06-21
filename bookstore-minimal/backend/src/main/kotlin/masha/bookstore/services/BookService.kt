package masha.bookstore.services

import masha.bookstore.core.BaseService
import masha.bookstore.dtos.BookDto
import masha.bookstore.interfaces.IBookService
import masha.bookstore.models.*
import masha.bookstore.repositories.BookRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class BookService(
    @Autowired override val repository: BookRepository
) : BaseService<Book, BookRepository>(repository), IBookService {

    override fun create(author: Author, dto: BookDto): Book {
        val book = Book(
            author = author,
            name = dto.name,
            description = dto.description,
            year = dto.year,
            price = dto.price
        )

        repository.save(book)
        return book
    }

    override fun change(id: Int, author: Author, dto: BookDto): Book {
        val book: Book = getOne(id)

        book.author = author
        book.name = dto.name
        book.description = dto.description
        book.year = dto.year
        book.price = dto.price

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