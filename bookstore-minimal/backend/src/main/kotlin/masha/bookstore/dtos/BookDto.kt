package masha.bookstore.dtos

data class BookDto (
    val author: Int = 0,
    val reviews: List<Int> = emptyList(),
    val name: String = "",
    val description: String = "no description",
    val year: Int = 0,
    val price: Int = 0,
    val id: Int = 0
)