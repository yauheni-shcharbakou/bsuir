package com.example.bookstorejvm.views.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.bookstorejvm.databinding.ReviewsFragmentBinding
import com.example.bookstorejvm.interfaces.IMainActivity
import com.example.bookstorejvm.interfaces.IPickHandler
import com.example.bookstorejvm.models.Review
import com.example.bookstorejvm.shared.Page
import com.example.bookstorejvm.viewModels.ReviewViewModel
import com.example.bookstorejvm.views.adapters.ReviewsAdapter

class ReviewsFragment : Fragment(), View.OnClickListener, IPickHandler {

    private var layout: ReviewsFragmentBinding? = null

    private val reviewViewModel: ReviewViewModel by activityViewModels()

    private var reviewsObserver: Observer<List<Review>>? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        layout = ReviewsFragmentBinding.inflate(inflater, container, false)

        val reviewsAdapter = ReviewsAdapter(this)

        with (layout!!) {
            reviewsRecycleView.layoutManager = LinearLayoutManager(requireContext())
            reviewsRecycleView.adapter = reviewsAdapter
        }

        layout!!.createReviewBtn.setOnClickListener(this)
        reviewsObserver = Observer { reviewsAdapter.update(it) }

        return layout?.root
    }

    override fun onClick(v: View?) {
        layout?.let {
            when(v) {
                it.createReviewBtn -> {
                    reviewViewModel.setCheckedReview(null)
                    reviewViewModel.setIsEdit(false)
                    (activity as? IMainActivity)?.openFragment(Page.EDIT_REVIEW)
                }
                else -> {}
            }
        }
    }

    override fun onStart() {
        super.onStart()
        reviewsObserver?.let { reviewViewModel.reviews.observe(this, it) }
    }

    override fun onStop() {
        super.onStop()
        reviewsObserver?.let { reviewViewModel.reviews.removeObserver(it) }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        layout = null
    }

    override fun onPickCard(position: Int) {
        reviewViewModel.setCheckedReview(position)
        reviewViewModel.setIsEdit(false)
        (activity as? IMainActivity)?.openFragment(Page.REVIEW)
    }
}
