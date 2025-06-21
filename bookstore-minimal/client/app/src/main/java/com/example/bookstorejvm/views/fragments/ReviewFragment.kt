package com.example.bookstorejvm.views.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import com.example.bookstorejvm.databinding.ReviewFragmentBinding
import com.example.bookstorejvm.interfaces.IMainActivity
import com.example.bookstorejvm.models.Review
import com.example.bookstorejvm.shared.Page
import com.example.bookstorejvm.viewModels.ReviewViewModel

class ReviewFragment : Fragment(), View.OnClickListener {

    private var layout: ReviewFragmentBinding? = null

    private val reviewViewModel: ReviewViewModel by activityViewModels()

    private var checkedReviewObserver: Observer<Review>? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        layout = ReviewFragmentBinding.inflate(inflater, container, false)

        with (layout!!) {
            checkedReviewObserver = Observer {
                reviewAuthor.text = "Автор: ${it.author}"
                reviewContent.text = "Описание: ${it.description}"
            }
        }

        layout!!.editReviewBtn.setOnClickListener(this)
        layout!!.deleteReviewBtn.setOnClickListener(this)

        return layout?.root
    }

    override fun onClick(v: View?) {
        layout?.let {
            when(v) {
                it.editReviewBtn -> {
                    reviewViewModel.setIsEdit(true)
                    (activity as? IMainActivity)?.openFragment(Page.EDIT_REVIEW)
                }
                it.deleteReviewBtn -> {
                    reviewViewModel.setIsEdit(false)
                    reviewViewModel.deleteReview()
                    (activity as? IMainActivity)?.openFragment(Page.REVIEWS)
                }
                else -> {}
            }
        }
    }

    override fun onStart() {
        super.onStart()
        checkedReviewObserver?.let { reviewViewModel.checkedReview.observe(this, it) }
    }

    override fun onStop() {
        super.onStop()
        checkedReviewObserver?.let { reviewViewModel.checkedReview.removeObserver(it) }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        layout = null
    }
}
