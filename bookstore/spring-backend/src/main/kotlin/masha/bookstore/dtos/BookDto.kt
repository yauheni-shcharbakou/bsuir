package masha.bookstore.dtos

data class BookDto (
    val author: Int = 0,
    val publisher: Int = 0,
    val category: Int = 0,
    val reviews: List<Int> = emptyList(),
    val name: String = "",
    val id: Int = 0
)