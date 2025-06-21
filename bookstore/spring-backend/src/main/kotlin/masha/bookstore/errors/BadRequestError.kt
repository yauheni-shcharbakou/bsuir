package masha.bookstore.errors

import masha.bookstore.core.BaseError
import org.springframework.http.HttpStatus

class BadRequestError(
    override val message: String = ErrorMessage.BAD_REQUEST
) : BaseError(
    HttpStatus.BAD_REQUEST,
    ApiError(
        code = HttpStatus.BAD_REQUEST,
        message = message
    )
)