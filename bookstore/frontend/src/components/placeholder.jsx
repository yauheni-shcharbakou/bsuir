import React from 'react'

const Placeholder = ({ message }) => {
  return (
    <div className="container">
      <h4 align="center">{message || 'Страница не закончена на данный момент'}</h4>
    </div>
  )
}

export default Placeholder
