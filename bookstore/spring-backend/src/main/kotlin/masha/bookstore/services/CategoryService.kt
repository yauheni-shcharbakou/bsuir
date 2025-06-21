package masha.bookstore.services

import masha.bookstore.core.BaseService
import masha.bookstore.models.*
import masha.bookstore.interfaces.ICategoryService
import masha.bookstore.repositories.CategoryRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class CategoryService(
    @Autowired override val repository: CategoryRepository
) : BaseService<Category, CategoryRepository>(repository), ICategoryService {

    override fun create(name: String): Category {
        val category = Category(name)
        repository.save(category)
        return category
    }

    override fun change(id: Int, name: String): Category {
        val category: Category = getOne(id)
        category.name = name
        repository.save(category)
        return category
    }

    override fun addBook(book: Book) {
        book.category.let {
            it.books.add(book)
            repository.save(it)
        }
    }

    override fun removeBook(book: Book) {
        book.category.let {
            it.books.remove(book)
            repository.save(it)
        }
    }
}