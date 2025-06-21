import React, { useContext } from 'react'
import { Context } from '../../store'

const UserCard = ({ user, onChange, onDelete }) => {
  const context = useContext(Context)

  const getRole = (role) => {
    let result

    switch (role) {
      case 'customer':
        result = 'Покупатель'
        break
      case 'salesman':
        result = 'Продавец'
        break
      default:
        result = 'Администратор'
        break
    }

    return result
  }

  return (
    <div className="card card--row">
      <div>
        <p>E-mail: {user.email}</p>
        <p>Роль: {getRole(user.role)}</p>
      </div>
      <div>
        <button
          className="btn"
          onClick={() => onChange(user)}
          disabled={user.role === 'admin'}
        >
          Сделать администратором
        </button>
        <button
          className="btn"
          onClick={() => onDelete(user)}
          disabled={context.user.user._id === user._id}
        >
          Удалить
        </button>
      </div>
    </div>
  )
}

export default UserCard
