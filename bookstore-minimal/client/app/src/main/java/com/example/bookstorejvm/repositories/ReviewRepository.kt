package com.example.bookstorejvm.repositories

import com.example.bookstorejvm.dtos.DeleteDto
import com.example.bookstorejvm.models.Review
import retrofit2.Response
import retrofit2.http.*

interface ReviewRepository {
    @GET("/reviews")
    suspend fun getAll(): Response<List<Review>>

    @GET("/reviews/{id}")
    suspend fun getOne(@Path("id") id: Int): Response<Review>

    @POST("/reviews")
    suspend fun create(@Body dto: Review): Response<Review>

    @PUT("/reviews/{id}")
    suspend fun change(@Path("id") id: Int, @Body dto: Review): Response<Review>

    @DELETE("/reviews/{id}")
    suspend fun delete(@Path("id") id: Int): Response<DeleteDto>
}
