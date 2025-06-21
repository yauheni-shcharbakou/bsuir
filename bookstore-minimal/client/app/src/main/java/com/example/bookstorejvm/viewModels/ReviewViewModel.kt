package com.example.bookstorejvm.viewModels

import android.app.Application
import android.widget.Toast
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.example.bookstorejvm.models.Review
import com.example.bookstorejvm.shared.Default
import com.example.bookstorejvm.shared.Http
import com.example.bookstorejvm.shared.Utils
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ReviewViewModel(private val app: Application) : AndroidViewModel(app) {

    val reviews: MutableLiveData<List<Review>> = MutableLiveData(emptyList())
    val checkedReview: MutableLiveData<Review> = MutableLiveData(Default.REVIEW)

    private var isEdit: Boolean = false
    private var bookId: Int = -1

    fun loadReviews() {
        if (bookId < 1) return

        viewModelScope.launch(Dispatchers.IO) {
            try {
                Http.bookRepository.getBookReviews(bookId).let {
                    withContext(Dispatchers.Main) {
                        if (it.isSuccessful) {
                            reviews.value = it.body()
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

    fun getIsEdit(): Boolean = isEdit

    fun setCheckedReview(index: Int?) {
        reviews.value?.let {
            checkedReview.value = if (index == null) Default.REVIEW else it[index]
        }
    }

    fun setBookId(value: Int) {
        bookId = value
    }

    fun setIsEdit(value: Boolean) {
        isEdit = value
    }

    private fun createReview(dto: Review) {
        val reviewDto = Review(book = bookId, author = dto.author, description = dto.description)

        viewModelScope.launch(Dispatchers.IO) {
            try {
                Http.reviewRepository.create(reviewDto).let {
                    withContext(Dispatchers.Main) {
                        if (it.isSuccessful && it.body() != null) {
                            Toast.makeText(
                                app.applicationContext,
                                "Отзыв добавлен",
                                Toast.LENGTH_SHORT
                            ).show()

                            reviews.value = (reviews.value ?: emptyList()).plusElement(it.body()!!)
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

    private fun changeReview(dto: Review) {
        val reviewDto = Review(book = bookId, author = dto.author, description = dto.description)
        val checkedReviewId: Int = checkedReview.value?.id ?: return

        viewModelScope.launch(Dispatchers.IO) {
            try {
                Http.reviewRepository
                    .change(checkedReviewId, reviewDto)
                    .let {
                        withContext(Dispatchers.Main) {
                            if (it.isSuccessful) {
                                val changedReview: Review? = it.body()

                                Toast.makeText(
                                    app.applicationContext,
                                    "Отзыв изменен",
                                    Toast.LENGTH_SHORT
                                ).show()

                                checkedReview.value = changedReview ?: Default.REVIEW
                                reviews.value = reviews.value
                                    ?.map { review ->
                                        if (review.id == changedReview?.id) changedReview else review
                                    }
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

    fun onSubmit(dto: Review) = if (!isEdit) createReview(dto) else changeReview(dto)

    fun deleteReview() {
        val checkedReviewId: Int = checkedReview.value?.id ?: return

        viewModelScope.launch(Dispatchers.IO) {
            try {
                Http.reviewRepository.delete(checkedReviewId).let {
                    withContext(Dispatchers.Main) {
                        if (it.isSuccessful) {
                            Toast.makeText(
                                app.applicationContext,
                                "Отзыв удален",
                                Toast.LENGTH_SHORT
                            ).show()

                            checkedReview.value = Default.REVIEW
                            reviews.value = reviews.value?.filter { review ->
                                review.id != it.body()?.id
                            }
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
