package com.example.bookstorejvm.shared

import android.app.Application
import android.widget.Toast

object Utils {
    fun errorHandler(app: Application, e: Exception) {
        Toast.makeText(app.applicationContext, e.message ?: "Неизвестная ошибка", Toast.LENGTH_SHORT).show()
    }
}