package masha.bookstore.core

import masha.bookstore.errors.ApiError
import org.springframework.http.HttpStatus

abstract class BaseError(
    val httpStatus: HttpStatus,
    val apiError: ApiError
) : RuntimeException(apiError.message)