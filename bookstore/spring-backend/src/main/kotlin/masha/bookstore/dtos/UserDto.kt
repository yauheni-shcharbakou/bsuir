package masha.bookstore.dtos

import masha.bookstore.shared.Role

data class UserDto (
    val books: List<Int> = emptyList(),
    val email: String = "",
    val password: String = "",
    val role: String = Role.CUSTOMER,
    val id: Int = 0
)