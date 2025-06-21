import React, { useContext } from 'react'
import { Context } from '../../store'
import { useLocation } from 'react-router-dom'
import { RoutePath } from '../../shared/constants'

const OfferCard = ({ offer, book, onChange, onDelete, onOpen, onBuy }) => {
  const { user } = useContext(Context)
  const { pathname } = useLocation()

  return (
    <div className="card card--row">
      <div>
        <p>Книга: {book.name}</p>
        <p>Автор: {book._author.name}</p>
        {pathname !== RoutePath.Offer && <p>Продавец: {offer.salesman}</p>}
        <p>Количество: {offer.amount}</p>
        <p>Цена: {offer.price} руб за книгу</p>
      </div>
      <div className="card--row">
        {pathname === RoutePath.Offer ? (
          <>
            <button className="btn" onClick={() => onChange(offer)}>
              Изменить
            </button>
            <button className="btn" onClick={() => onDelete(offer)}>
              Удалить
            </button>
          </>
        ) : (
          <>
            <button className="btn" onClick={() => onOpen(book)}>
              Информация о книге
            </button>
            <button
              className="btn"
              onClick={() => onBuy(offer)}
              disabled={user.user._id === offer._user || !user.isAuth}
            >
              Оформить
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default OfferCard
