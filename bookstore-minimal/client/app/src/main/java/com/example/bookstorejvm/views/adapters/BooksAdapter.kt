package com.example.bookstorejvm.views.adapters

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.bookstorejvm.databinding.BookCardBinding
import com.example.bookstorejvm.interfaces.IPickHandler
import com.example.bookstorejvm.models.Book

class BooksAdapter(
    private val pickHandler: IPickHandler
) : RecyclerView.Adapter<BooksAdapter.ViewHolder>() {

    private var books: MutableList<Book> = mutableListOf()
    private var layout: BookCardBinding? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        layout = BookCardBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(layout!!, pickHandler)
    }

    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val book: Book = books[position]

        with (holder.layout) {
            bookCardName.text = "Название: ${book.name}"
            bookCardAuthor.text = "Автор: ${book.author.name}"
            bookCardPrice.text = "Цена: ${book.price} руб."

            root.setOnClickListener(holder)
        }
    }

    override fun getItemCount(): Int = books.size

    class ViewHolder internal constructor(
        val layout: BookCardBinding,
        private val pickHandler: IPickHandler
    ) : RecyclerView.ViewHolder(layout.root), View.OnClickListener {

        override fun onClick(v: View?) {
            pickHandler.onPickCard(adapterPosition)
        }
    }

    fun update(newBooks: List<Book>?) {
        newBooks?.let {
            books.clear()
            books = it.toMutableList()
            notifyDataSetChanged()
        }
    }
}
