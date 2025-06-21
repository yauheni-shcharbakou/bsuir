package masha.bookstore.dtos

import com.fasterxml.jackson.annotation.JsonProperty

data class BookPopulatedDto (
    @JsonProperty("author") val author: AuthorDto,
    @JsonProperty("reviews") val reviews: List<ReviewDto> = emptyList(),
    @JsonProperty("name") val name: String = "",
    @JsonProperty("description") val description: String = "no description",
    @JsonProperty("year") val year: Int = 0,
    @JsonProperty("price") val price: Int = 0,
    @JsonProperty("id") val id: Int = 0
)