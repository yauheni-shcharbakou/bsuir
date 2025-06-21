package com.example.bookstorejvm.viewModels

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.example.bookstorejvm.shared.Http
import com.example.bookstorejvm.shared.Utils
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class NetworkViewModel(private val app: Application) : AndroidViewModel(app) {

    val hasConnection: MutableLiveData<Boolean> = MutableLiveData(true)

    fun checkConnection() {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                Http.mainRepository.healthCheck().let {
                    if (!it.isSuccessful) throw Exception("Нет соединения с сервером")
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) { Utils.errorHandler(app, e) }
                delay(2000).let { hasConnection.value = false }
            }
        }
    }
}
