package masha.bookstore.dtos

import com.fasterxml.jackson.annotation.JsonProperty

data class DeleteDto (@JsonProperty("id") val id: Int = 0)