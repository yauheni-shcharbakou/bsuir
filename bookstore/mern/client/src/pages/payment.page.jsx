import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../store'
import { paymentApi } from '../api'
import PaymentCard from '../components/cards/payment.card'

const PaymentPage = observer(() => {
  const { payment } = useContext(Context)
  const [name, setName] = useState('')
  const [current, setCurrent] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    paymentApi
      .getAll()
      .then((response) => payment.setPayments(response))
      .catch((e) => console.error(e))
  }, [])

  const createSubmitHandler = () => {
    if (name) {
      paymentApi
        .create(name)
        .then((response) => {
          payment.addPayment(response)
          setName('')
        })
        .catch((e) => alert(e.response.data.message || e))
    } else {
      alert('Неверная информация')
    }
  }

  const changeSubmitHandler = () => {
    if (name) {
      paymentApi
        .change(current, name)
        .then((response) => {
          payment.changePayment(response)
          setIsEdit(false)
          setCurrent('')
          setName('')
        })
        .catch((e) => alert(e.response.data.message || e))
    } else {
      alert('Неверная информация')
    }
  }

  const changeHandler = (currentPayment) => {
    setCurrent(currentPayment._id)
    setIsEdit(true)
    setName(currentPayment.name)
  }

  const deleteHandler = (currentPayment) => {
    paymentApi
      .delete(currentPayment._id)
      .then((response) => payment.deletePayment(response))
      .catch((e) => console.error(e))
  }

  return (
    <div className="content">
      <h2>Управление способами оплаты</h2>
      <div className="form">
        <label>
          <input
            type="text"
            value={name}
            placeholder="Название способа"
            onInput={(e) => setName(e.target.value)}
          />
        </label>
        <button
          className="btn"
          onClick={isEdit ? changeSubmitHandler : createSubmitHandler}
        >
          {isEdit ? 'Изменить способ' : 'Создать способ'}
        </button>
      </div>
      <div className="card__container">
        {payment.payments.map((p) => (
          <PaymentCard
            key={p._id}
            payment={p}
            onChange={changeHandler}
            onDelete={deleteHandler}
          />
        ))}
      </div>
    </div>
  )
})

export default PaymentPage
