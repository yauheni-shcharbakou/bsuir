package com.example.bookstorejvm.views.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.Observer
import com.example.bookstorejvm.databinding.EditReviewFragmentBinding
import com.example.bookstorejvm.interfaces.IMainActivity
import com.example.bookstorejvm.models.Review
import com.example.bookstorejvm.shared.Page
import com.example.bookstorejvm.viewModels.BookViewModel
import com.example.bookstorejvm.viewModels.ReviewViewModel

class EditReviewFragment : Fragment(), View.OnClickListener {

    private var layout: EditReviewFragmentBinding? = null

    private val bookViewModel: BookViewModel by activityViewModels()
    private val reviewViewModel: ReviewViewModel by activityViewModels()

    private var checkedReviewObserver: Observer<Review>? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        layout = EditReviewFragmentBinding.inflate(inflater, container, false)

        with(layout!!) {
            checkedReviewObserver = Observer {
                reviewAuthorInput.setText(if (reviewViewModel.getIsEdit()) it.author else "")
                reviewDescriptionInput.setText(if (reviewViewModel.getIsEdit()) it.description else "")
            }
        }

        layout!!.reviewCancelBtn.setOnClickListener(this)
        layout!!.reviewOkBtn.setOnClickListener(this)

        return layout?.root
    }

    private fun onSubmit() {
        layout?.let {
            try {
                val author: String? = it.reviewAuthorInput.text?.toString()
                val description: String? = it.reviewDescriptionInput.text?.toString()

                val isAuthorValid: Boolean = author != null && author.isNotBlank()
                val isDescriptionValid: Boolean = description != null && description.isNotBlank()

                if (isAuthorValid && isDescriptionValid) {
                    reviewViewModel.onSubmit(
                        Review(
                            book = bookViewModel.getCheckedBook().id,
                            author = author!!,
                            description = description!!
                        )
                    )
                } else {
                    throw Exception()
                }
            } catch (e: Exception) {
                Toast.makeText(requireContext(), "Неверные данные", Toast.LENGTH_SHORT).show()
                (activity as? IMainActivity)?.openFragment(Page.REVIEWS)
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

    override fun onClick(v: View?) {
        layout?.let {
            when (v) {
                it.reviewCancelBtn -> {
                    reviewViewModel.setIsEdit(false)
                    reviewViewModel.setCheckedReview(null)
                    (activity as? IMainActivity)?.openFragment(Page.REVIEWS)
                }
                it.reviewOkBtn -> {
                    onSubmit()
                    reviewViewModel.setIsEdit(false)
                    reviewViewModel.setCheckedReview(null)
                    (activity as? IMainActivity)?.openFragment(Page.REVIEWS)
                }
                else -> {}
            }
        }
    }
}
