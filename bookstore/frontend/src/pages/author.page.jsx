import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../store'
import { authorApi } from '../api'
import AuthorCard from '../components/cards/author.card'

const AuthorPage = observer(() => {
  const { author } = useContext(Context)
  const [name, setName] = useState('')
  const [current, setCurrent] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    authorApi
      .getAll()
      .then((response) => author.setAuthors(response))
      .catch((e) => console.error(e))
  }, [])

  const createSubmitHandler = () => {
    if (name) {
      authorApi
        .create(name)
        .then((response) => {
          author.addAuthor(response)
          setName('')
        })
        .catch((e) => alert(e.response.data.message || e))
    } else {
      alert('Неверная информация')
    }
  }

  const changeSubmitHandler = () => {
    if (name) {
      authorApi
        .change(current, name)
        .then((response) => {
          author.changeAuthor(response)
          setIsEdit(false)
          setCurrent('')
          setName('')
        })
        .catch((e) => alert(e.response.data.message || e))
    } else {
      alert('Неверная информация')
    }
  }

  const changeHandler = (currentAuthor) => {
    setCurrent(currentAuthor.id)
    setIsEdit(true)
    setName(currentAuthor.name)
  }

  const deleteHandler = (currentAuthor) => {
    authorApi
      .delete(currentAuthor.id)
      .then((response) => author.deleteAuthor(response))
      .catch((e) => console.error(e))
  }

  return (
    <div className="content">
      <h2>Управление авторами</h2>
      <div className="form">
        <label>
          <input
            type="text"
            value={name}
            placeholder="Имя автора"
            onInput={(e) => setName(e.target.value)}
          />
        </label>
        <button className="btn" onClick={isEdit ? changeSubmitHandler : createSubmitHandler}>
          {isEdit ? 'Изменить автора' : 'Создать автора'}
        </button>
      </div>
      <div className="card__container">
        {author.authors.map((a) => (
          <AuthorCard
            key={a.id.toString()}
            author={a}
            onChange={changeHandler}
            onDelete={deleteHandler}
          />
        ))}
      </div>
    </div>
  )
})

export default AuthorPage
