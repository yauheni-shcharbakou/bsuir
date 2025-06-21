import React from 'react'

const PublisherCard = ({ publisher, onChange, onDelete }) => {
  return (
    <div className="card card--row">
      <div>
        <p>Название: {publisher.name}</p>
        <p>Адрес: {publisher.address}</p>
      </div>
      <div className="card--row">
        <button className="btn" onClick={() => onChange(publisher)}>
          Изменить
        </button>
        <button className="btn" onClick={() => onDelete(publisher)}>
          Удалить
        </button>
      </div>
    </div>
  )
}

export default PublisherCard
