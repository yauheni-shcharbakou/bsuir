package masha.bookstore.services

import masha.bookstore.core.BaseService
import masha.bookstore.dtos.AuthorDto
import masha.bookstore.interfaces.IAuthorService
import masha.bookstore.models.Book
import masha.bookstore.models.Author
import masha.bookstore.repositories.AuthorRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class AuthorService(
    @Autowired override val repository: AuthorRepository
) : BaseService<Author, AuthorRepository>(repository), IAuthorService {

    override fun create(dto: AuthorDto): Author {
        val author = Author(name = dto.name)
        repository.save(author)
        return author
    }

    override fun change(id: Int, dto: AuthorDto): Author {
        val author: Author = getOne(id)
        author.name = dto.name
        return author
    }

    override fun addBook(book: Book) {
        book.author.let {
            it.books.add(book)
            repository.save(it)
        }
    }

    override fun removeBook(book: Book) {
        book.author.let {
            it.books.remove(book)
            repository.save(it)
        }
    }
}