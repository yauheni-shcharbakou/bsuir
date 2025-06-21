package masha.bookstore.services

import masha.bookstore.core.BaseService
import masha.bookstore.models.*
import masha.bookstore.interfaces.IAuthorService
import masha.bookstore.repositories.AuthorRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class AuthorService(
    @Autowired override val repository: AuthorRepository
) : BaseService<Author, AuthorRepository>(repository), IAuthorService {

    override fun create(name: String): Author {
        val author = Author(name)
        repository.save(author)
        return author
    }

    override fun change(id: Int, name: String): Author {
        val author: Author = getOne(id)
        author.name = name
        repository.save(author)
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