package com.example.bookstorejvm.repositories

import com.example.bookstorejvm.dtos.HealthCheckDto
import retrofit2.Response
import retrofit2.http.GET

interface MainRepository {
    @GET("/")
    suspend fun healthCheck(): Response<HealthCheckDto>
}
