package masha.bookstore.models

import masha.bookstore.dtos.CategoryDto
import org.hibernate.annotations.LazyCollection
import org.hibernate.annotations.LazyCollectionOption
import javax.persistence.*

@Entity
class Category(
    @Column(unique = true) var name: String = "",

    @OneToMany
    @LazyCollection(LazyCollectionOption.FALSE)
    @Column(name = "categoryBooks")
    val books: MutableList<Book> = mutableListOf(),

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0
) {

    fun toDto(): CategoryDto {
        return CategoryDto(name = this.name, id = this.id)
    }
}