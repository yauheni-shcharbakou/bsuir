import React from 'react'

const PaymentCard = ({ payment, onChange, onDelete }) => {
  return (
    <div className="card card--row">
      <span>{payment.name}</span>
      <div className="card--row">
        <button className="btn" onClick={() => onChange(payment)}>
          Изменить
        </button>
        <button className="btn" onClick={() => onDelete(payment)}>
          Удалить
        </button>
      </div>
    </div>
  )
}

export default PaymentCard
