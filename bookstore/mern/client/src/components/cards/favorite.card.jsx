import React from 'react'

const FavoriteCard = ({ book, isAdded, onClick }) => {
  return (
    <div className={isAdded ? 'card card--row colored' : 'card card--row'}>
      <div>
        <p>
          <b>{book.name}</b>
        </p>
        <p>{book._author.name}</p>
      </div>
      <div className="card--row">
        <button className="btn" onClick={() => onClick(book)}>
          {isAdded ? 'Убрать' : 'Добавить'}
        </button>
      </div>
    </div>
  )
}

export default FavoriteCard
