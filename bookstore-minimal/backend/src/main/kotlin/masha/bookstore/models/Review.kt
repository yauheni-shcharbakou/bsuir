package masha.bookstore.models

import masha.bookstore.dtos.ReviewDto
import masha.bookstore.dtos.ReviewPopulatedDto
import javax.persistence.*

@Entity
class Review(
    @ManyToOne val book: Book,

    var author: String = "",
    var description: String = "no description",

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0
) {

    fun toDto(): ReviewDto {
        return ReviewDto(
            book = book.id,
            author = author,
            description = description,
            id = id
        )
    }

    fun toPopulatedDto(): ReviewPopulatedDto {
        return ReviewPopulatedDto(
            book = book.toDto(),
            author = author,
            description = description,
            id = id
        )
    }
}