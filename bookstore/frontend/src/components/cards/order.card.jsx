import React from 'react'

const OrderCard = ({ order, book, payment, onDelete }) => {
  return (
    <div className="card card--row">
      <div>
        <p>Книга: {book.name}</p>
        <p>Автор: {book.author.name}</p>
        <p>Способ оплаты: {payment.name}</p>
        <p>Количество: {order.amount}</p>
        <p>Цена: {order.price * order.amount} руб</p>
        <p>Дата заказа: {order.date}</p>
      </div>
      <div className="card--row">
        <button className="btn" onClick={() => onDelete(order)}>
          Удалить
        </button>
      </div>
    </div>
  )
}

export default OrderCard
