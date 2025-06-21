package masha.bookstore.models

import masha.bookstore.dtos.ReviewDto
import javax.persistence.*

@Entity
class Review(
    @ManyToOne val book: Book,

    val author: String = "",
    var content: String = "",

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0
) {

    fun toDto(): ReviewDto {
        return ReviewDto(
            book = this.book.id,
            author = this.author,
            content = this.content,
            id = this.id
        )
    }
}