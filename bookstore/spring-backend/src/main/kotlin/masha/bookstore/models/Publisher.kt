package masha.bookstore.models

import masha.bookstore.dtos.PublisherDto
import org.hibernate.annotations.LazyCollection
import org.hibernate.annotations.LazyCollectionOption
import javax.persistence.*

@Entity
class Publisher(
    @Column(unique = true) var name: String = "",
    var address: String = "",

    @OneToMany
    @LazyCollection(LazyCollectionOption.FALSE)
    @Column(name = "publisherBooks")
    val books: MutableList<Book> = mutableListOf(),

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0
) {

    fun toDto(): PublisherDto {
        return PublisherDto(name = this.name, address = this.address, id = this.id)
    }
}