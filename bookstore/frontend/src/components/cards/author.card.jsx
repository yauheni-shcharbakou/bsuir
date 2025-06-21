import React from 'react'

const AuthorCard = ({ author, onChange, onDelete }) => {
  return (
    <div className="card card--row">
      <span>{author.name}</span>
      <div className="card--row">
        <button className="btn" onClick={() => onChange(author)}>
          Изменить
        </button>
        <button className="btn" onClick={() => onDelete(author)}>
          Удалить
        </button>
      </div>
    </div>
  )
}

export default AuthorCard
