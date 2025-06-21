package loshica.api.hotel.dtos

import com.fasterxml.jackson.annotation.JsonProperty

data class CommentPopulatedDto (
    @JsonProperty("room") val room: RoomDto,
    @JsonProperty("createdBy") val createdBy: UserDto,
    @JsonProperty("content") val content: String = "",
    @JsonProperty("id") val id: Int = 0
)