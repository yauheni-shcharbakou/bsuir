package masha.bookstore.errors

import masha.bookstore.core.BaseError
import org.springframework.http.HttpStatus

class UnauthorizedError(
    override val message: String = ErrorMessage.UNAUTHORIZED
) : BaseError(
    HttpStatus.UNAUTHORIZED,
    ApiError(
        code = HttpStatus.UNAUTHORIZED,
        message = message
    )
)