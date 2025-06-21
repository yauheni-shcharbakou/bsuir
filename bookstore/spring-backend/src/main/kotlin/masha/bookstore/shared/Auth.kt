package masha.bookstore.shared

import masha.bookstore.dtos.TokenDto
import masha.bookstore.errors.UnauthorizedError

object Auth {
    fun verify(authorizationToken: String?, roles: List<String>? = emptyList()): TokenDto {
        try {
            if (authorizationToken == null) {
                throw UnauthorizedError()
            }

            val userParamsList: List<String> = authorizationToken.split(" ")

            val userId: Int = userParamsList[0].toInt()
            val role: String = userParamsList[1]

            if (roles != null && !roles.contains(role)) {
                throw UnauthorizedError()
            }

            return TokenDto(id = userId, role = role)
        } catch (e: Exception) {
            throw UnauthorizedError()
        }
    }
}