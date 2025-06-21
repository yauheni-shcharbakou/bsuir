package com.example.bookstorejvm.repositories

import com.example.bookstorejvm.dtos.DeleteDto
import com.example.bookstorejvm.models.Author
import retrofit2.Response
import retrofit2.http.*

interface AuthorRepository {
    @GET("/authors")
    suspend fun getAll(): Response<List<Author>>

    @GET("/authors/{id}")
    suspend fun getOne(@Path("id") id: Int): Response<Author>

    @POST("/authors")
    suspend fun create(@Body dto: Author): Response<Author>

    @PUT("/authors/{id}")
    suspend fun change(@Path("id") id: Int, @Body dto: Author): Response<Author>

    @DELETE("/authors/{id}")
    suspend fun delete(@Path("id") id: Int): Response<DeleteDto>
}
