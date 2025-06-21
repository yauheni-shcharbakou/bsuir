package masha.bookstore.services

import masha.bookstore.core.BaseService
import masha.bookstore.models.*
import masha.bookstore.interfaces.IUserService
import masha.bookstore.repositories.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class UserService(
    @Autowired override val repository: UserRepository
) : BaseService<User, UserRepository>(repository), IUserService {

    override fun getByEmail(email: String): User? = repository.findByEmail(email)

    override fun getAmount(): Int = repository.count().toInt()

    override fun create(email: String, password: String, role: String): User {
        val user = User(email, password, role)
        repository.save(user)
        return user
    }

    override fun change(id: Int, role: String): User {
        val user: User = getOne(id)
        user.role = role
        repository.save(user)
        return user
    }
}