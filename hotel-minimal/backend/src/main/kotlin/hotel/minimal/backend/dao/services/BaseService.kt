package hotel.minimal.backend.dao.services

import hotel.minimal.backend.dao.interfaces.IBaseService
import hotel.minimal.backend.errors.EntityNotFoundError
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

abstract class BaseService<E: IntEntity, R : IntEntityClass<E>>(protected val repository: R) : IBaseService<E> {
    private val modelClassName: String
        get() {
            return try {
                val classNameParsed: List<String> = repository.javaClass.declaringClass.toString().split(".")
                classNameParsed[classNameParsed.size - 1]
            } catch (e: Exception) {
                "Entity"
            }
        }

    protected suspend fun <T> query(callback: suspend () -> T): T {
        return newSuspendedTransaction(Dispatchers.IO) { callback() }
    }

    override suspend fun getAll(): List<E> {
        return query { repository.all().toList() }
    }

    override suspend fun getById(id: Int): E {
        return query {
            repository.findById(id) ?: throw EntityNotFoundError(modelClassName, id)
        }
    }

    override suspend fun delete(id: Int): Int {
        return query {
            repository.findById(id)?.delete()
            id
        }
    }
}