package masha.bookstore.models

import masha.bookstore.dtos.BookDto
import masha.bookstore.dtos.BookPopulatedDto
import org.hibernate.annotations.LazyCollection
import org.hibernate.annotations.LazyCollectionOption
import javax.persistence.*

@Entity
class Book(
    @ManyToOne var author: Author,
    @ManyToOne var publisher: Publisher,
    @ManyToOne var category: Category,

    @OneToMany
    @LazyCollection(LazyCollectionOption.FALSE)
    @Column(name = "bookReviews")
    val reviews: MutableList<Review> = mutableListOf(),

    var name: String = "",

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0
) {

    fun toDto(): BookDto {
        return BookDto(
            author = this.author.id,
            publisher = this.publisher.id,
            category = this.category.id,
            reviews = this.reviews.map { it.id },
            name = this.name,
            id = this.id
        )
    }

    fun toPopulatedDto(): BookPopulatedDto {
        return BookPopulatedDto(
            author = this.author.toDto(),
            publisher = this.publisher.toDto(),
            category = this.category.toDto(),
            reviews = this.reviews.map { it.toDto() },
            name = this.name,
            id = this.id
        )
    }
}