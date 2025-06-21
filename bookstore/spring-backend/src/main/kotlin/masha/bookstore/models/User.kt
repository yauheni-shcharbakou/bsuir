package masha.bookstore.models

import masha.bookstore.dtos.UserDto
import masha.bookstore.shared.Role
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import javax.persistence.*

@Entity(name = "application_user")
class User(
    @Column(unique = true) var email: String = "",
    var password: String = "",
    var role: String = Role.CUSTOMER,

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0
) {

    fun hashPassword(password: String) {
        this.password = bcInstance.encode(password)
    }

    fun change(email: String, password: String, role: String) {
        this.email = email
        hashPassword(password)
        this.role = role
    }

    fun comparePasswords(password: String): Boolean = bcInstance.matches(password, this.password)

    companion object {
        private val bcInstance = BCryptPasswordEncoder(5)
    }

    fun toDto(): UserDto {
        return UserDto(
            books = emptyList(),
            email = this.email,
            password = this.password,
            role = this.role,
            id = this.id
        )
    }
}