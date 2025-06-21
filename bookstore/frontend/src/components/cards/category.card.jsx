import React from 'react'

const CategoryCard = ({ category, onChange, onDelete }) => {
  return (
    <div className="card card--row">
      <span>{category.name}</span>
      <div className="card--row">
        <button className="btn" onClick={() => onChange(category)}>
          Изменить
        </button>
        <button className="btn" onClick={() => onDelete(category)}>
          Удалить
        </button>
      </div>
    </div>
  )
}

export default CategoryCard
