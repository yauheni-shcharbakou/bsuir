package masha.bookstore.dtos

data class ReviewDto (
    val book: Int = 0,
    val author: String = "",
    val content: String = "",
    val id: Int = 0
)