package masha.bookstore.dtos

data class ReviewDto (
    val book: Int = 0,
    val author: String = "",
    val description: String = "no description",
    val id: Int = 0
)