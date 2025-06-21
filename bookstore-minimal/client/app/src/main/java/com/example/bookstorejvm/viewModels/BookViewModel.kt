package com.example.bookstorejvm.viewModels

import android.app.Application
import android.widget.Toast
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.example.bookstorejvm.dtos.BookDto
import com.example.bookstorejvm.models.Book
import com.example.bookstorejvm.shared.Default
import com.example.bookstorejvm.shared.Http
import com.example.bookstorejvm.shared.Utils
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class BookViewModel(private val app: Application) : AndroidViewModel(app) {

    val books: MutableLiveData<List<Book>> = MutableLiveData(emptyList())
    val checkedBook: MutableLiveData<Book> = MutableLiveData(Default.BOOK)

    private var isEdit: Boolean = false

    init {
        loadBooks()
    }

    private fun loadBooks() {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                Http.bookRepository.getAll().let {
                    withContext(Dispatchers.Main) {
                        if (it.isSuccessful) {
                            books.value = it.body()
                        } else {
                            throw Exception(it.message())
                        }
                    }
                }
            } catch (e: Exception) {
                Toast.makeText(
                    app.applicationContext,
                    "Не удалось загрузить книги",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }

    fun getCheckedBook(): Book = checkedBook.value ?: Default.BOOK

    fun getIsEdit(): Boolean = isEdit

    fun setCheckedBook(index: Int?) {
        books.value?.let {
            checkedBook.value = if (index == null) Default.BOOK else it[index]
        }
    }

    fun setIsEdit(value: Boolean) {
        isEdit = value
    }

    private fun createBook(dto: BookDto) {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                Http.bookRepository.create(dto).let {
                    withContext(Dispatchers.Main) {
                        if (it.isSuccessful && it.body() != null) {
                            Toast.makeText(app.applicationContext, "Книга добавлена", Toast.LENGTH_SHORT).show()
                            books.value = books.value?.plusElement(it.body()!!)
                        } else {
                            throw Exception(it.message())
                        }
                    }
                }
            } catch (e: Exception) {
                Utils.errorHandler(app, e)
            }
        }
    }

    private fun changeBook(dto: BookDto) {
        val checkedBookId: Int = checkedBook.value?.id ?: return

        viewModelScope.launch(Dispatchers.IO) {
            try {
                Http.bookRepository.change(checkedBookId, dto).let {
                    withContext(Dispatchers.Main) {
                        if (it.isSuccessful) {
                            val changedBook: Book? = it.body()

                            Toast.makeText(app.applicationContext, "Книга изменена", Toast.LENGTH_SHORT).show()

                            checkedBook.value = changedBook ?: Default.BOOK
                            books.value = books.value
                                ?.map { book -> if (book.id == changedBook?.id) changedBook else book }
                                ?: emptyList()
                        } else {
                            throw Exception(it.message())
                        }
                    }
                }
            } catch (e: Exception) {
                Utils.errorHandler(app, e)
            } finally {
                isEdit = false
            }
        }
    }

    fun onSubmit(dto: BookDto) = if (!isEdit) createBook(dto) else changeBook(dto)

    fun deleteBook() {
        val checkedBookId: Int = checkedBook.value?.id ?: return

        viewModelScope.launch(Dispatchers.IO) {
            try {
                Http.bookRepository.delete(checkedBookId).let {
                    withContext(Dispatchers.Main) {
                        if (it.isSuccessful) {
                            Toast.makeText(app.applicationContext, "Книга удалена", Toast.LENGTH_SHORT).show()
                            checkedBook.value = Default.BOOK
                            books.value = books.value?.filter { book -> book.id != it.body()?.id }
                        } else {
                            throw Exception(it.message())
                        }
                    }
                }
            } catch (e: Exception) {
                Utils.errorHandler(app, e)
            }
        }
    }
}
