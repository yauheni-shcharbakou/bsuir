package com.example.bookstorejvm.views.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import com.example.bookstorejvm.databinding.BookFragmentBinding
import com.example.bookstorejvm.interfaces.IMainActivity
import com.example.bookstorejvm.models.Book
import com.example.bookstorejvm.shared.Page
import com.example.bookstorejvm.viewModels.BookViewModel
import com.example.bookstorejvm.viewModels.ReviewViewModel

class BookFragment : Fragment(), View.OnClickListener {

    private var layout: BookFragmentBinding? = null

    private val bookViewModel: BookViewModel by activityViewModels()
    private val reviewViewModel: ReviewViewModel by activityViewModels()

    private var checkedBookObserver: Observer<Book>? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        layout = BookFragmentBinding.inflate(inflater, container, false)

        with (layout!!) {
            checkedBookObserver = Observer {
                bookName.text = "Название: ${it.name}"
                bookAuthorName.text = "Автор: ${it.author.name}"
                bookDescription.text = "Описание: ${it.description}"
                bookYear.text = "Год: ${it.year}"
                bookPrice.text = "Цена: ${it.price} руб."
            }
        }

        layout!!.editBookBtn.setOnClickListener(this)
        layout!!.deleteBookBtn.setOnClickListener(this)
        layout!!.reviewsBtn.setOnClickListener(this)

        return layout?.root
    }

    override fun onClick(v: View?) {
        layout?.let {
            when(v) {
                it.editBookBtn -> {
                    bookViewModel.setIsEdit(true)
                    (activity as? IMainActivity)?.openFragment(Page.EDIT_BOOK)
                }
                it.deleteBookBtn -> {
                    bookViewModel.setIsEdit(false)
                    bookViewModel.deleteBook()
                    (activity as? IMainActivity)?.openFragment(Page.BOOKS)
                }
                it.reviewsBtn -> {
                    reviewViewModel.setBookId(bookViewModel.getCheckedBook().id)
                    reviewViewModel.loadReviews()
                    (activity as? IMainActivity)?.openFragment(Page.REVIEWS)
                }
                else -> {}
            }
        }
    }

    override fun onStart() {
        super.onStart()
        checkedBookObserver?.let { bookViewModel.checkedBook.observe(this, it) }
    }

    override fun onStop() {
        super.onStop()
        checkedBookObserver?.let { bookViewModel.checkedBook.removeObserver(it) }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        layout = null
    }
}
