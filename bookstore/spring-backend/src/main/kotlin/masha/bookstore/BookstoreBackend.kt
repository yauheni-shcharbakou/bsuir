package masha.bookstore

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BookstoreBackend

fun main(args: Array<String>) {
    runApplication<BookstoreBackend>(*args)
}
