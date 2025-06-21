package masha.bookstore.interfaces

interface IBaseService<M> {
    fun getAll(): Iterable<M>
    fun getOne(id: Int): M
    fun delete(id: Int): Int
}