package masha.bookstore.errors

import masha.bookstore.core.BaseError
import org.springframework.http.HttpStatus

class EntityNotFoundError(entityName: String, id: Int) : BaseError(
    HttpStatus.NOT_FOUND,
    ApiError(
        code = HttpStatus.NOT_FOUND,
        message = "$entityName with id '$id' not found"
    )
)