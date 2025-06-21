package com.example.bookstorejvm.views.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.bookstorejvm.databinding.BooksFragmentBinding
import com.example.bookstorejvm.interfaces.IMainActivity
import com.example.bookstorejvm.interfaces.IPickHandler
import com.example.bookstorejvm.models.Book
import com.example.bookstorejvm.shared.Page
import com.example.bookstorejvm.viewModels.BookViewModel
import com.example.bookstorejvm.views.adapters.BooksAdapter

class BooksFragment : Fragment(), View.OnClickListener, IPickHandler {

    private var layout: BooksFragmentBinding? = null

    private val bookViewModel: BookViewModel by activityViewModels()

    private var booksObserver: Observer<List<Book>>? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        layout = BooksFragmentBinding.inflate(inflater, container, false)

        val booksAdapter = BooksAdapter(this)

        with (layout!!) {
            booksRecyclerView.layoutManager = LinearLayoutManager(requireContext())
            booksRecyclerView.adapter = booksAdapter
        }

        layout!!.createBookBtn.setOnClickListener(this)
        booksObserver = Observer { booksAdapter.update(it) }

        return layout?.root
    }

    override fun onClick(v: View?) {
        layout?.let {
            when(v) {
                it.createBookBtn -> {
                    bookViewModel.setCheckedBook(null)
                    bookViewModel.setIsEdit(false)
                    (activity as? IMainActivity)?.openFragment(Page.EDIT_BOOK)
                }
                else -> {}
            }
        }
    }

    override fun onStart() {
        super.onStart()
        booksObserver?.let { bookViewModel.books.observe(this, it) }
    }

    override fun onStop() {
        super.onStop()
        booksObserver?.let { bookViewModel.books.removeObserver(it) }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        layout = null
    }

    override fun onPickCard(position: Int) {
        bookViewModel.setCheckedBook(position)
        bookViewModel.setIsEdit(false)
        (activity as? IMainActivity)?.openFragment(Page.BOOK)
    }
}
