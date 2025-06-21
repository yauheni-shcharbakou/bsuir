package masha.bookstore.models

import masha.bookstore.dtos.AuthorDto
import org.hibernate.annotations.LazyCollection
import org.hibernate.annotations.LazyCollectionOption
import javax.persistence.*

@Entity
class Author(
    @Column(unique = true) var name: String = "",

    @OneToMany
    @LazyCollection(LazyCollectionOption.FALSE)
    @Column(name = "authorBooks")
    val books: MutableList<Book> = mutableListOf(),

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0
) {

    fun toDto(): AuthorDto {
        return AuthorDto(name = this.name, id = this.id)
    }
}