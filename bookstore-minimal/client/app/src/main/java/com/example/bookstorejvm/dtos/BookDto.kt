package com.example.bookstorejvm.dtos

import com.google.gson.annotations.SerializedName

data class BookDto(
    @SerializedName("id") val id: Int = -1,
    @SerializedName("author") var author: Int = -1,
    @SerializedName("reviews") var reviews: MutableSet<Int> = mutableSetOf(),
    @SerializedName("name") var name: String = "",
    @SerializedName("description") var description: String = "",
    @SerializedName("year") var year: Int = 0,
    @SerializedName("price") var price: Int = 0,
)
