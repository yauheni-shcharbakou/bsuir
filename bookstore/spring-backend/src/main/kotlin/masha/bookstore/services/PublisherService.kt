package masha.bookstore.services

import masha.bookstore.core.BaseService
import masha.bookstore.models.*
import masha.bookstore.interfaces.IPublisherService
import masha.bookstore.repositories.PublisherRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class PublisherService(
    @Autowired override val repository: PublisherRepository
) : BaseService<Publisher, PublisherRepository>(repository), IPublisherService {

    override fun create(name: String, address: String): Publisher {
        val publisher = Publisher(name, address)
        repository.save(publisher)
        return publisher
    }

    override fun change(id: Int, name: String, address: String): Publisher {
        val publisher: Publisher = getOne(id)
        publisher.name = name
        publisher.address = address
        repository.save(publisher)
        return publisher
    }

    override fun addBook(book: Book) {
        book.publisher.let {
            it.books.add(book)
            repository.save(it)
        }
    }

    override fun removeBook(book: Book) {
        book.publisher.let {
            it.books.remove(book)
            repository.save(it)
        }
    }
}