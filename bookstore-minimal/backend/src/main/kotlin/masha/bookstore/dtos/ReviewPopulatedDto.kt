package masha.bookstore.dtos

import com.fasterxml.jackson.annotation.JsonProperty

data class ReviewPopulatedDto (
    @JsonProperty("book") val book: BookDto,
    @JsonProperty("author") val author: String = "",
    @JsonProperty("description") val description: String = "no description",
    @JsonProperty("id") val id: Int = 0
)