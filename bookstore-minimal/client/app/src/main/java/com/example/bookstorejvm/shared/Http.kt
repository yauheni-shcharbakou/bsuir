package com.example.bookstorejvm.shared

import com.example.bookstorejvm.BuildConfig
import com.example.bookstorejvm.repositories.AuthorRepository
import com.example.bookstorejvm.repositories.BookRepository
import com.example.bookstorejvm.repositories.MainRepository
import com.example.bookstorejvm.repositories.ReviewRepository
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

object Http {
    private const val BASE_URL: String = BuildConfig.BACKEND_URL
    private var retrofit: Retrofit? = null

    private fun getClient(): Retrofit {
        if (retrofit == null) {
            val okHttpClient = OkHttpClient()
                .newBuilder()
                .readTimeout(30, TimeUnit.SECONDS)
                .connectTimeout(30, TimeUnit.SECONDS)
                .build()

            retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(okHttpClient)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
        }

        return retrofit!!
    }

    val bookRepository: BookRepository
        get() = getClient().create(BookRepository::class.java)

    val authorRepository: AuthorRepository
        get() = getClient().create(AuthorRepository::class.java)

    val reviewRepository: ReviewRepository
        get() = getClient().create(ReviewRepository::class.java)

    val mainRepository: MainRepository
        get() = getClient().create(MainRepository::class.java)
}
