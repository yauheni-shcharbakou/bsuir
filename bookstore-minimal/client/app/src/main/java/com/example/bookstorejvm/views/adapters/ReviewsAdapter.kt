package com.example.bookstorejvm.views.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.bookstorejvm.databinding.ReviewCardBinding
import com.example.bookstorejvm.interfaces.IPickHandler
import com.example.bookstorejvm.models.Review

class ReviewsAdapter(
    private val pickHandler: IPickHandler
) : RecyclerView.Adapter<ReviewsAdapter.ViewHolder>() {

    private var reviews: MutableList<Review> = mutableListOf()
    private var layout: ReviewCardBinding? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        layout = ReviewCardBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(layout!!, pickHandler)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val review: Review = reviews[position]

        with (holder.layout) {
            reviewCardAuthor.text = review.author
            reviewCardDescription.text = review.description

            root.setOnClickListener(holder)
        }
    }

    override fun getItemCount(): Int = reviews.size

    class ViewHolder internal constructor(
        val layout: ReviewCardBinding,
        private val pickHandler: IPickHandler
    ) : RecyclerView.ViewHolder(layout.root), View.OnClickListener {

        override fun onClick(v: View?) {
            pickHandler.onPickCard(adapterPosition)
        }
    }

    fun update(newReviews: List<Review>?) {
        newReviews?.let {
            reviews.clear()
            reviews = it.toMutableList()
            notifyDataSetChanged()
        }
    }
}
