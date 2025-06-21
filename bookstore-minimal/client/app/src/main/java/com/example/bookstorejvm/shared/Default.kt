package com.example.bookstorejvm.shared

import com.example.bookstorejvm.models.Author
import com.example.bookstorejvm.models.Book
import com.example.bookstorejvm.models.Review

object Default {
    val AUTHOR = Author(name = "пусто")

    val REVIEW = Review(description = "Описание отзыва")

    val BOOK = Book(
        author = AUTHOR,
        name = "пусто",
        description = "пусто",
        year = 1900,
        price = 123
    )
}
