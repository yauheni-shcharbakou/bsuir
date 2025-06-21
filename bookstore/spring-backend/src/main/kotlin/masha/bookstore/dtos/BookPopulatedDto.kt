package masha.bookstore.dtos

import com.fasterxml.jackson.annotation.JsonProperty

data class BookPopulatedDto (
    @JsonProperty("author") val author: AuthorDto,
    @JsonProperty("publisher") val publisher: PublisherDto,
    @JsonProperty("category") val category: CategoryDto,
    @JsonProperty("reviews") val reviews: List<ReviewDto> = emptyList(),
    @JsonProperty("name") val name: String = "",
    @JsonProperty("id") val id: Int = 0
)