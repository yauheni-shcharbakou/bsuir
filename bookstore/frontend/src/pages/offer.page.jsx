import React, { useContext, useEffect, useState } from 'react'
// import { Context } from '../store'
// import { bookApi, offerApi } from '../api'
// import OfferCard from '../components/cards/offer.card'
import { observer } from 'mobx-react-lite'
import Placeholder from '../components/placeholder'

const OfferPage = observer(() => {
  // const { user, book, offer } = useContext(Context)
  // const [checkedBook, setCheckedBook] = useState('')
  // const [price, setPrice] = useState(0)
  // const [amount, setAmount] = useState(1)
  // const [current, setCurrent] = useState('')
  // const [isEdit, setIsEdit] = useState(false)
  //
  // const loadOffers = () => {
  //   offerApi
  //     .getCurrent(user.user._id)
  //     .then((response) => offer.setOffers(response))
  //     .catch((e) => console.error(e))
  // }
  //
  // useEffect(() => {
  //   offer.setOffers([])
  //   book.setBooks([])
  //
  //   bookApi
  //     .getAll()
  //     .then((response) => {
  //       book.setBooks(response)
  //       loadOffers()
  //     })
  //     .catch((e) => console.error(e))
  // }, [])
  //
  // const resetForm = () => {
  //   setAmount(0)
  //   setCheckedBook('')
  //   setPrice(0)
  // }
  //
  // const createSubmitHandler = () => {
  //   if (amount && checkedBook && price) {
  //     offerApi
  //       .create(checkedBook, user.user._id, user.user.email, amount, price)
  //       .then((response) => {
  //         offer.addOffer(response)
  //         resetForm()
  //       })
  //       .catch((e) => alert(e.response.data.message || e))
  //   } else {
  //     alert('Неверная информация')
  //   }
  // }
  //
  // const changeSubmitHandler = () => {
  //   if (amount && checkedBook && price) {
  //     offerApi
  //       .change(current, checkedBook, user.user._id, amount, price)
  //       .then(() => {
  //         loadOffers()
  //         setIsEdit(false)
  //         setCurrent('')
  //         resetForm()
  //       })
  //       .catch((e) => alert(e.response.data.message || e))
  //   } else {
  //     alert('Неверная информация')
  //   }
  // }
  //
  // const changeHandler = (currentOffer) => {
  //   setCurrent(currentOffer._id)
  //   setIsEdit(true)
  //   setPrice(currentOffer.price)
  //   setAmount(currentOffer.amount)
  //   setCheckedBook(currentOffer._book)
  // }
  //
  // const deleteHandler = (currentOffer) => {
  //   offerApi
  //     .delete(currentOffer._id)
  //     .then((response) => offer.deleteOffer(response))
  //     .catch((e) => console.error(e))
  // }

  return (
    <div className="content">
      <h2>Управление предложениями</h2>
      <Placeholder />
      {/*<div className="form form--large">*/}
      {/*  <div className="form__row">*/}
      {/*    <label>*/}
      {/*      Цена за 1 книгу*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        min={0}*/}
      {/*        value={price}*/}
      {/*        onInput={(e) => setPrice(e.target.value)}*/}
      {/*      />*/}
      {/*    </label>*/}
      {/*    <label>*/}
      {/*      Количество*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        min={0}*/}
      {/*        value={amount}*/}
      {/*        onInput={(e) => setAmount(e.target.value)}*/}
      {/*      />*/}
      {/*    </label>*/}
      {/*  </div>*/}
      {/*  <div className="form__row">*/}
      {/*    <select*/}
      {/*      style={{ width: '50%' }}*/}
      {/*      onChange={(e) => setCheckedBook(e.target.value)}*/}
      {/*      value={checkedBook}*/}
      {/*      className="browser-default"*/}
      {/*    >*/}
      {/*      <option value="">Выберите книгу</option>*/}
      {/*      {book.books.map((b) => (*/}
      {/*        <option key={b._id} value={b._id}>*/}
      {/*          {b.name} ({b._author.name})*/}
      {/*        </option>*/}
      {/*      ))}*/}
      {/*    </select>*/}
      {/*    <button*/}
      {/*      className="btn"*/}
      {/*      onClick={isEdit ? changeSubmitHandler : createSubmitHandler}*/}
      {/*    >*/}
      {/*      {isEdit ? 'Изменить предложение' : 'Содать предложение'}*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="container">*/}
      {/*  {offer.offers.map((o) => (*/}
      {/*    <OfferCard*/}
      {/*      key={o._id}*/}
      {/*      offer={o}*/}
      {/*      book={book.findBook(o._book)}*/}
      {/*      onChange={changeHandler}*/}
      {/*      onDelete={deleteHandler}*/}
      {/*      onOpen={() => {}}*/}
      {/*      onBuy={() => {}}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  )
})

export default OfferPage
