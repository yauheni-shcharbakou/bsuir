package masha.bookstore.models

import masha.bookstore.dtos.BookDto
import masha.bookstore.dtos.BookPopulatedDto
import javax.persistence.*

@Entity
class Book(
    @ManyToOne var author: Author,

    @OneToMany(mappedBy = "book", fetch = FetchType.EAGER)
    val reviews: MutableSet<Review> = mutableSetOf(),

    @Column(unique = true) var name: String = "",
    var description: String = "no description",
    var year: Int = 0,
    var price: Int = 0,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0
) {

    fun toDto(): BookDto {
        return BookDto(
            author = author.id,
            reviews = reviews.map { it.id },
            name = name,
            description = description,
            year = year,
            price = price,
            id = id
        )
    }

    fun toPopulatedDto(): BookPopulatedDto {
        return BookPopulatedDto(
            author = author.toDto(),
            reviews = reviews.map { it.toDto() },
            name = name,
            description = description,
            year = year,
            price = price,
            id = id
        )
    }
}