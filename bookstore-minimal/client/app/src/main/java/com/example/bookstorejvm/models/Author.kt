package com.example.bookstorejvm.models

import com.google.gson.annotations.SerializedName

data class Author(
    @SerializedName("id") val id: Int = -1,
    @SerializedName("books") var books: List<Int> = emptyList(),
    @SerializedName("name") var name: String = ""
)
