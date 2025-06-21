import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store'
import { bookApi, offerApi, orderApi, paymentApi, userApi } from '../api'
import OfferCard from '../components/cards/offer.card'
import { observer } from 'mobx-react-lite'
import { RoutePath } from '../shared/constants'
import { useHistory } from 'react-router-dom'

const MainPage = observer(() => {
  const { user, book, offer, payment } = useContext(Context)
  const [checkedPayment, setCheckedPayment] = useState('')
  const [amount, setAmount] = useState(1)
  const [current, setCurrent] = useState({})
  const [isBuy, setIsBuy] = useState(false)
  const [init, setInit] = useState(true)
  const { push } = useHistory()

  const loadOffers = () => {
    offerApi
      .getAll()
      .then((response) => {
        offer.setOffers(response)

        if (user.isAuth && init) {
          userApi
            .getBooks(user.user._id)
            .then((response) => {
              book.setFavorites(response)
              book.setNotify(
                offer.offers
                  .filter(({ _book }) => book.isFavorite(book.findBook(_book)))
                  .map(({ _book }) => book.findBook(_book))
              )
              setInit(false)
            })
            .catch((e) => console.error(e))
        }
      })
      .catch((e) => console.error(e))
  }

  useEffect(() => {
    offer.setOffers([])
    book.setFavorites([])
    book.setNotify([])
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
            loadOffers()
          })
          .catch((e) => console.error(e))
      })
      .catch((e) => console.error(e))
  }, [])

  const resetForm = () => {
    setAmount(0)
    setCheckedPayment('')
  }

  const submitHandler = () => {
    if (isBuy && amount && checkedPayment && current._id) {
      orderApi
        .create(
          current._id,
          current._book,
          checkedPayment,
          user.user._id,
          current._user,
          amount,
          current.price
        )
        .then(() => {
          loadOffers()
          resetForm()
        })
        .catch((e) => console.error(e))
    } else {
      alert('Неверная информация')
    }
  }

  const buyHandler = (currentOffer) => {
    setCurrent(currentOffer)
    setIsBuy(true)
    setAmount(currentOffer.amount)
  }

  const openHandler = (currentBook) => {
    book.setCurrent(currentBook._id)
    push(`${RoutePath.Review}/${currentBook._id}`)
  }

  return (
    <div className="content">
      <h2>Ассортимент книг</h2>
      {book.notify.length > 0 && (
        <div className="card">
          <h5>Ваши любимые книги есть в продаже:</h5>
          <ul>
            {book.notify.map((b) => (
              <li key={b._id}>
                {b.name} ({b._author.name})
              </li>
            ))}
          </ul>
          <button className="btn" onClick={() => book.setNotify([])}>
            Хорошо
          </button>
        </div>
      )}
      <div className="form form--large">
        <div className="form__row">
          <h4>Оформление заказа</h4>
          <label>
            Количество
            <input
              type="text"
              min={0}
              max={isBuy ? 1 : Number.MAX_SAFE_INTEGER}
              value={amount}
              onInput={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>
        <div className="form__row">
          <select
            style={{ width: '50%' }}
            onChange={(e) => setCheckedPayment(e.target.value)}
            value={checkedPayment}
            className="browser-default"
          >
            <option value="">Выберите способ оплаты</option>
            {payment.payments.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
          <button className="btn" onClick={submitHandler} disabled={!isBuy}>
            Оформить заказ
          </button>
        </div>
      </div>
      <div className="container">
        {offer.offers.map((o) => (
          <OfferCard
            key={o._id}
            offer={o}
            book={book.findBook(o._book)}
            onChange={() => {}}
            onDelete={() => {}}
            onOpen={openHandler}
            onBuy={buyHandler}
          />
        ))}
      </div>
    </div>
  )
})

export default MainPage
