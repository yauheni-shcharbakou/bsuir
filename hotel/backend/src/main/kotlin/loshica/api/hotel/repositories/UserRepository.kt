package loshica.api.hotel.repositories

import loshica.api.hotel.models.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : CrudRepository<User, Int> {
    fun findByEmail(email: String): User?
}