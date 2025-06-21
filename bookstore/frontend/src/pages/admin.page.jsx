import React, { useContext, useEffect } from 'react'
import { Context } from '../store'
import { observer } from 'mobx-react-lite'
// import SessionCard from '../components/cards/session.card'
import { userApi, sessionApi } from '../api'
import UserCard from '../components/cards/user.card'
import { NavLink } from 'react-router-dom'
import { RoutePath } from '../shared/constants'

const AdminPage = observer(() => {
  const { user, session } = useContext(Context)

  // const getSessions = () => {
  //   sessionApi
  //     .getAll()
  //     .then((response) => session.setSessions(response))
  //     .catch((e) => console.error(e))
  // }

  const getUsers = () => {
    userApi
      .getAll()
      .then((response) => user.setUsers(response))
      .catch((e) => console.error(e))
  }

  // useEffect(getSessions, [])
  useEffect(getUsers, [])

  const changeUserHandler = (currentUser) => {
    if (currentUser.role !== 'admin') {
      userApi
        .changeRole(currentUser.id, 'admin')
        .then((response) => user.changeUser(response))
        .catch((e) => console.error(e))
    }
  }

  const deleteUserHandler = (currentUser) => {
    userApi
      .delete(currentUser.id)
      .then((response) => {
        // getSessions()
        user.deleteUser(response)
      })
      .catch((e) => console.error(e))
  }

  return (
    <div className="content">
      <h4>Панель администрирования</h4>
      <ul className="admin__btn_container">
        {/*<li className="admin__btn">*/}
        {/*  <NavLink to={RoutePath.Payment}>Способы оплаты</NavLink>*/}
        {/*</li>*/}
        <li className="admin__btn">
          <NavLink to={RoutePath.Author}>Авторы</NavLink>
        </li>
        <li className="admin__btn">
          <NavLink to={RoutePath.Publisher}>Издательства</NavLink>
        </li>
        <li className="admin__btn">
          <NavLink to={RoutePath.Category}>Категории</NavLink>
        </li>
        <li className="admin__btn">
          <NavLink to={RoutePath.Book}>Книги</NavLink>
        </li>
      </ul>
      <details className="spoiler">
        <summary className="spoiler__summary">Пользователи</summary>
        <div className="spoiler__container">
          {user.users.map((user) => (
            <UserCard
              key={user.id.toString()}
              user={user}
              onChange={changeUserHandler}
              onDelete={deleteUserHandler}
            />
          ))}
        </div>
      </details>
      {/*<details className="spoiler">*/}
      {/*  <summary className="spoiler__summary">Сессии</summary>*/}
      {/*  <div className="spoiler__container">*/}
      {/*    {session.sessions.map((session) => (*/}
      {/*      <SessionCard key={session._id} session={session} />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</details>*/}
    </div>
  )
})

export default AdminPage
