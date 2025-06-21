import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store'
import { reviewApi } from '../api'
import { observer } from 'mobx-react-lite'
import ReviewCard from '../components/cards/review.card'

const ReviewPage = observer(() => {
  const { user, book, review } = useContext(Context)
  const [content, setContent] = useState('')
  const [current, setCurrent] = useState('')
  const [author, setAuthor] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => review.setReviews(book.current._reviews), [])

  const createSubmitHandler = () => {
    if (content && user.isAuth) {
      reviewApi
        .create(book.current._id, user.user.email, content)
        .then((response) => {
          review.addReview(response)
          setContent('')
        })
        .catch((e) => alert(e.response.data.message || e))
    } else {
      alert('Неверная информация')
    }
  }

  const changeSubmitHandler = () => {
    if (content && author === user.user.email) {
      reviewApi
        .change(current, content)
        .then((response) => {
          review.changeReview(response)
          setIsEdit(false)
          setCurrent('')
          setContent('')
          setAuthor('')
        })
        .catch((e) => alert(e.response.data.message || e))
    } else {
      alert('Неверная информация')
    }
  }

  const changeHandler = (currentReview) => {
    setCurrent(currentReview._id)
    setIsEdit(true)
    setContent(currentReview.content)
    setAuthor(currentReview.author)
  }

  const deleteHandler = (currentReview) => {
    reviewApi
      .delete(currentReview._id)
      .then((response) => review.deleteReview(response))
      .catch((e) => console.error(e))
  }

  return (
    <div className="content">
      <div className="card">
        <h2>{book.current.name}</h2>
        <h4>{book.current._author.name}</h4>
        <p>
          <b>{book.current._publisher.name}</b>,{' '}
          {book.current._publisher.address}
        </p>
        <p>Категория: {book.current._category.name}</p>
      </div>
      <details className="spoiler">
        <summary className="spoiler__summary">Отзывы</summary>
        <div className="spoiler__container">
          {review.reviews.map((r) => (
            <ReviewCard
              key={r._id}
              review={r}
              onChange={changeHandler}
              onDelete={deleteHandler}
              isAdmin={user.user.role === 'admin'}
              isAuthor={r.author === user.user.email}
            />
          ))}
        </div>
        <div className="form form__row form--large">
          <label>
            <input
              style={{ minWidth: '400px' }}
              type="text"
              value={content}
              placeholder="Текст отзыва"
              onInput={(e) => setContent(e.target.value)}
            />
          </label>
          <button
            className="btn"
            onClick={isEdit ? changeSubmitHandler : createSubmitHandler}
            disabled={!user.isAuth}
          >
            {isEdit ? 'Изменить отзыв' : 'Оставить отзыв'}
          </button>
        </div>
      </details>
    </div>
  )
})

export default ReviewPage
