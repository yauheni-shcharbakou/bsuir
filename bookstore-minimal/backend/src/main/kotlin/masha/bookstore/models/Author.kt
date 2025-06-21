package masha.bookstore.models

import masha.bookstore.dtos.AuthorDto
import masha.bookstore.dtos.AuthorPopulatedDto
import javax.persistence.*

@Entity
class Author(
    @OneToMany(mappedBy = "author", fetch = FetchType.EAGER)
    val books: MutableSet<Book> = mutableSetOf(),

    @Column(unique = true) var name: String = "",

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0
) {

    fun toDto(): AuthorDto {
        return AuthorDto(
            books = books.map { it.id },
            name = name,
            id = id
        )
    }

    fun toPopulatedDto(): AuthorPopulatedDto {
        return AuthorPopulatedDto(
            books = books.map { it.toDto() },
            name = name,
            id = id
        )
    }
}