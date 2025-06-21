package com.example.bookstorejvm.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.RadioButton
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import com.example.bookstorejvm.databinding.EditBookFragmentBinding
import com.example.bookstorejvm.dtos.BookDto
import com.example.bookstorejvm.interfaces.IMainActivity
import com.example.bookstorejvm.models.Author
import com.example.bookstorejvm.models.Book
import com.example.bookstorejvm.shared.Default
import com.example.bookstorejvm.shared.Page
import com.example.bookstorejvm.viewModels.AuthorViewModel
import com.example.bookstorejvm.viewModels.BookViewModel

class EditBookFragment : Fragment(), View.OnClickListener {

    private var layout: EditBookFragmentBinding? = null
    private val bookViewModel: BookViewModel by activityViewModels()
    private val authorViewModel: AuthorViewModel by activityViewModels()

    private var authorId: Int = Default.BOOK.author.id
    private var authorsObserver: Observer<List<Author>>? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        layout = EditBookFragmentBinding.inflate(inflater, container, false)

        authorId = if (bookViewModel.getIsEdit()) bookViewModel.getCheckedBook().author.id else authorId

        with(layout!!) {
            if (bookViewModel.getIsEdit()) {
                val book: Book = bookViewModel.getCheckedBook()

                bookNameInput.setText(book.name)
                bookDescriptionInput.setText(book.description)
                bookYearInput.setText(book.year.toString())
                bookPriceInput.setText(book.price.toString())
            }
        }

        authorsObserver = Observer { onChangeAuthors(it) }

        layout!!.bookCancelBtn.setOnClickListener(this)
        layout!!.bookOkBtn.setOnClickListener(this)

        return layout?.root
    }

    private fun onSubmit() {
        layout?.let {
            try {
                val name: String? = it.bookNameInput.text?.toString()
                val description: String? = it.bookDescriptionInput.text?.toString()
                val year: Int? = it.bookYearInput.text?.toString()?.toInt()
                val price: Int? = it.bookPriceInput.text?.toString()?.toInt()

                val isNameValid: Boolean = name != null && name.isNotBlank()

                if (isNameValid && year != null && price != null) {
                    bookViewModel.onSubmit(
                        BookDto(
                            author = authorId,
                            name = name!!,
                            description = description ?: "",
                            year = year,
                            price = price
                        )
                    )
                } else {
                    throw Exception()
                }
            } catch (e: Exception) {
                Toast.makeText(requireContext(), "Неверные данные", Toast.LENGTH_SHORT).show()
                (activity as? IMainActivity)?.openFragment(Page.BOOKS)
            }
        }
    }

    override fun onStart() {
        super.onStart()
        authorsObserver?.let { authorViewModel.authors.observe(this, it) }
    }

    override fun onStop() {
        super.onStop()
        authorsObserver?.let { authorViewModel.authors.removeObserver(it) }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        layout = null
    }

    override fun onClick(v: View?) {
        layout?.let {
            if (v is RadioButton) {
                authorId = v.id
            }

            when (v) {
                it.bookCancelBtn -> {
                    bookViewModel.setIsEdit(false)
                    bookViewModel.setCheckedBook(null)
                    (activity as? IMainActivity)?.openFragment(Page.BOOKS)
                }
                it.bookOkBtn -> {
                    onSubmit()
                    bookViewModel.setIsEdit(false)
                    bookViewModel.setCheckedBook(null)
                    (activity as? IMainActivity)?.openFragment(Page.BOOKS)
                }
                else -> {}
            }
        }
    }

    private fun onChangeAuthors(authors: List<Author>) {
        layout?.let { it ->
            authors.forEach { author ->
                val radioButton = RadioButton(context)
                authorId = if (bookViewModel.getIsEdit()) bookViewModel.getCheckedBook().author.id else authors[0].id

                radioButton.id = author.id
                radioButton.text = author.name
                radioButton.isChecked = radioButton.id == authorId

                radioButton.setOnClickListener(this)
                it.authorRadioGroup.addView(radioButton)
            }
        }
    }
}
