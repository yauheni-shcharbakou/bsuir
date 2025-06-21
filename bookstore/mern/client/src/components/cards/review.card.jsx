import React from 'react'

const AuthorCard = ({ review, onChange, onDelete, isAdmin, isAuthor }) => {
  return (
    <div className="card card--row">
      <div>
        <p>
          <b>{review.author}</b>
        </p>
        <p>{review.content}</p>
      </div>
      <div className="card--row">
        {isAuthor && (
          <button className="btn" onClick={() => onChange(review)}>
            Изменить
          </button>
        )}
        {(isAdmin || isAuthor) && (
          <button className="btn" onClick={() => onDelete(review)}>
            Удалить
          </button>
        )}
      </div>
    </div>
  )
}

export default AuthorCard
