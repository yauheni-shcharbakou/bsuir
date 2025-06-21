import React, { useContext, useEffect } from 'react'
import { Context } from '../store'
import { bookApi, orderApi, paymentApi } from '../api'
import { observer } from 'mobx-react-lite'
import OrderCard from '../components/cards/order.card'

const OrderPage = observer(() => {
  const { user, book, order, payment } = useContext(Context)

  useEffect(() => {
    order.setOrders([])
    book.setBooks([])
    payment.setPayments([])

    bookApi
      .getAll()
      .then((response) => {
        book.setBooks(response)

        paymentApi
          .getAll()
          .then((response) => {
            payment.setPayments(response)

            orderApi
              .getAll(user.user._id, user.user.role)
              .then((response) => order.setOrders(response))
              .catch((e) => console.error(e))
          })
          .catch((e) => console.error(e))
      })
      .catch((e) => console.error(e))
  }, [])

  const deleteHandler = (currentOrder) => {
    orderApi
      .delete(currentOrder._id)
      .then((response) => order.deleteOrder(response))
      .catch((e) => console.error(e))
  }

  return (
    <div className="content">
      <h2>Мои заказы</h2>
      <div className="container">
        {order.orders.map((o) => (
          <OrderCard
            key={o._id}
            order={o}
            book={book.findBook(o._book)}
            payment={payment.findPayment(o._payment)}
            onDelete={deleteHandler}
          />
        ))}
      </div>
    </div>
  )
})

export default OrderPage
