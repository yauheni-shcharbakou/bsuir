package masha.bookstore.interfaces

import masha.bookstore.models.User

interface IUserService : IBaseService<User> {
    fun getByEmail(email: String): User?
    fun getAmount(): Int
    fun create(email: String, password: String, role: String): User
    fun change(id: Int, role: String): User
}