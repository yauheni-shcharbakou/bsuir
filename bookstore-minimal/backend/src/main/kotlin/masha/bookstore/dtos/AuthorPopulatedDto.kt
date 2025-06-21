package masha.bookstore.dtos

import com.fasterxml.jackson.annotation.JsonProperty

data class AuthorPopulatedDto (
    @JsonProperty("books") val books: List<BookDto> = emptyList(),
    @JsonProperty("name") val name: String = "",
    @JsonProperty("id") val id: Int = 0
)