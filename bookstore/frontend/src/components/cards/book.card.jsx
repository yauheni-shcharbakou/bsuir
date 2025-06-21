import React from 'react'

const BookCard = ({ book, onOpen, onChange, onDelete, isAdmin }) => {
  return (
    <div className="card book__card card--row colored">
      <div>
        <p>
          Название: <b>{book.name}</b>
        </p>
        <p>Автор: {book.author.name}</p>
        <p>Издатель: {book.publisher.name}</p>
        <p>Категория: {book.category.name}</p>
      </div>
      {isAdmin && (
        <div className="card--column book__card-buttons">
          <button className="btn" onClick={() => onOpen(book)}>
            Открыть
          </button>
          <button className="btn" onClick={() => onChange(book)}>
            Изменить
          </button>
          <button className="btn" onClick={() => onDelete(book)}>
            Удалить
          </button>
        </div>
      )}
    </div>
  )
}

export default BookCard
