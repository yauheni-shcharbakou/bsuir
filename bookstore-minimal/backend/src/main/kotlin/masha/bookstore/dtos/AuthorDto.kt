package masha.bookstore.dtos

data class AuthorDto (
    val books: List<Int> = emptyList(),
    val name: String = "",
    val id: Int = 0
)