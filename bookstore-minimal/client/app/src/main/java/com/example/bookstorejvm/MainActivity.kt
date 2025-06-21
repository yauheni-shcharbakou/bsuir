package com.example.bookstorejvm

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.activity.viewModels
import androidx.fragment.app.add
import androidx.fragment.app.commit
import androidx.fragment.app.replace
import androidx.lifecycle.Observer
import com.example.bookstorejvm.databinding.MainActivityBinding
import com.example.bookstorejvm.interfaces.IMainActivity
import com.example.bookstorejvm.shared.Page
import com.example.bookstorejvm.viewModels.AuthorViewModel
import com.example.bookstorejvm.viewModels.NetworkViewModel
import com.example.bookstorejvm.views.fragments.*

class MainActivity : AppCompatActivity(), IMainActivity {

    private var layout: MainActivityBinding? = null

    private val networkViewModel: NetworkViewModel by viewModels()
    private val authorViewModel: AuthorViewModel by viewModels()

    private var hasConnectionObserver: Observer<Boolean>? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)

        layout = MainActivityBinding.inflate(layoutInflater)

        if (savedInstanceState == null && layout != null) {
            supportFragmentManager.commit {
                setReorderingAllowed(true)
                add<BooksFragment>(layout!!.fragmentContainer.id)
            }
        }

        hasConnectionObserver = Observer { if (!it) finish() }
    }

    override fun onStart() {
        super.onStart()
        hasConnectionObserver?.let { networkViewModel.hasConnection.observe(this, it) }
        networkViewModel.checkConnection()
        authorViewModel.loadAuthors()
    }

    override fun onStop() {
        super.onStop()
        hasConnectionObserver?.let { networkViewModel.hasConnection.removeObserver(it) }
    }

    override fun onDestroy() {
        super.onDestroy()
        layout = null
    }

    override fun openFragment(page: Page) {
        layout?.fragmentContainer?.id?.let {
            supportFragmentManager.commit {
                setReorderingAllowed(true)

                when (page) {
                    Page.EDIT_BOOK -> replace<EditBookFragment>(it)
                    Page.BOOKS -> replace<BooksFragment>(it)
                    Page.BOOK -> replace<BookFragment>(it)
                    Page.EDIT_REVIEW -> replace<EditReviewFragment>(it)
                    Page.REVIEWS -> replace<ReviewsFragment>(it)
                    Page.REVIEW -> replace<ReviewFragment>(it)
                }

                addToBackStack(page.toString())
            }
        }
    }
}