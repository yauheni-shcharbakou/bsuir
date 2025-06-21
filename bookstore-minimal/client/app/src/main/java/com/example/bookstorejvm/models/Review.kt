package com.example.bookstorejvm.models

import com.google.gson.annotations.SerializedName

data class Review(
    @SerializedName("id") val id: Int = -1,
    @SerializedName("book") var book: Int = -1,
    @SerializedName("author") var author: String = "Анонимус",
    @SerializedName("description") var description: String = ""
)
