package com.example.bookstorejvm.repositories

import com.example.bookstorejvm.dtos.BookDto
import com.example.bookstorejvm.dtos.DeleteDto
import com.example.bookstorejvm.models.Book
import com.example.bookstorejvm.models.Review
import retrofit2.Response
import retrofit2.http.*

interface BookRepository {
    @GET("/books")
    suspend fun getAll(): Response<List<Book>>

    @GET("/books/{id}")
    suspend fun getOne(@Path("id") id: Int): Response<Book>

    @GET("/books/{id}/reviews")
    suspend fun getBookReviews(@Path("id") id: Int): Response<List<Review>>

    @POST("/books")
    suspend fun create(@Body dto: BookDto): Response<Book>

    @PUT("/books/{id}")
    suspend fun change(@Path("id") id: Int, @Body dto: BookDto): Response<Book>

    @DELETE("/books/{id}")
    suspend fun delete(@Path("id") id: Int): Response<DeleteDto>
}
