package masha.bookstore.errors

import masha.bookstore.core.BaseError
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@ControllerAdvice
class ErrorHandler : ResponseEntityExceptionHandler() {

    @ExceptionHandler(BaseError::class)
    fun handleBaseException(error: BaseError): ResponseEntity<ApiError> {
        return ResponseEntity(error.apiError, error.httpStatus)
    }
}