package com.example.bookstorejvm.viewModels

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.example.bookstorejvm.models.Author
import com.example.bookstorejvm.shared.Http
import com.example.bookstorejvm.shared.Utils
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class AuthorViewModel(private val app: Application) : AndroidViewModel(app) {

    val authors: MutableLiveData<List<Author>> = MutableLiveData(emptyList())

    fun loadAuthors() {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                Http.authorRepository.getAll().let {
                    withContext(Dispatchers.Main) {
                        if (it.isSuccessful) {
                            authors.value = it.body()
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
