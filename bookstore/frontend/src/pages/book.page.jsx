import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../store'
import { useHistory } from 'react-router-dom'
import { authorApi, bookApi, categoryApi, publisherApi } from '../api'
import { RoutePath } from '../shared/constants'
import BookCard from '../components/cards/book.card'

const BookPage = observer(() => {
  const { user, book, author, publisher, category } = useContext(Context)
  const [name, setName] = useState('')
  const [checkedAuthor, setCheckedAuthor] = useState('')
  const [checkedPublisher, setCheckedPublisher] = useState('')
  const [checkedCategory, setCheckedCategory] = useState('')
  const [current, setCurrent] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const { push } = useHistory()

  useEffect(() => {
    authorApi
      .getAll()
      .then((response) => author.setAuthors(response))
      .catch((e) => console.error(e))
    publisherApi
      .getAll()
      .then((response) => publisher.setPublishers(response))
      .catch((e) => console.error(e))
    categoryApi
      .getAll()
      .then((response) => category.setCategories(response))
      .catch((e) => console.error(e))
    bookApi
      .getAll()
      .then((response) => book.setBooks(response))
      .catch((e) => console.error(e))
  }, [])

  const isAdmin = user.user.role === 'admin'

  const resetForm = () => {
    setName('')
    setCheckedAuthor('')
    setCheckedPublisher('')
    setCheckedCategory('')
  }

  const createSubmitHandler = () => {
    if (name && checkedAuthor && checkedPublisher && checkedCategory) {
      bookApi
        .create(checkedAuthor, checkedPublisher, checkedCategory, name)
        .then((response) => {
          book.addBook(response)
          resetForm()
        })
        .catch((e) => alert(e.response.data.message || e))
    } else {
      alert('Неверная информация')
    }
  }

  const changeSubmitHandler = () => {
    if (name && checkedAuthor && checkedPublisher && checkedCategory) {
      bookApi
        .change(current, checkedAuthor, checkedPublisher, checkedCategory, name)
        .then((response) => {
          book.changeBook(response)
          setIsEdit(false)
          setCurrent('')
          resetForm()
        })
        .catch((e) => alert(e.response.data.message || e))
    } else {
      alert('Неверная информация')
    }
  }

  const openHandler = (currentBook) => {
    book.setCurrent(currentBook.id)
    push(`${RoutePath.Review}/${currentBook.id}`)
  }

  const changeHandler = (currentBook) => {
    setCurrent(currentBook.id)
    setIsEdit(true)
    setName(currentBook.name)
    setCheckedAuthor(currentBook.author.id)
    setCheckedPublisher(currentBook.publisher.id)
    setCheckedCategory(currentBook.category.id)
  }

  const deleteHandler = (currentBook) => {
    bookApi
      .delete(currentBook.id)
      .then((response) => book.deleteBook(response))
      .catch((e) => console.error(e))
  }

  return (
    <div className="content">
      <h2>Управление книгами</h2>
      {isAdmin && (
        <div className="form form--large">
          <div className="form__row">
            <label>
              <input
                type="text"
                value={name}
                placeholder="Название книги"
                onInput={(e) => setName(e.target.value)}
              />
            </label>
            <button className="btn" onClick={isEdit ? changeSubmitHandler : createSubmitHandler}>
              {isEdit ? 'Изменить книгу' : 'Содать книгу'}
            </button>
          </div>

          <div className="form__row">
            <select
              onChange={(e) => setCheckedAuthor(e.target.value)}
              value={checkedAuthor}
              className="browser-default"
            >
              <option value="">Выберите автора</option>
              {author.authors.map((a) => (
                <option key={a.id.toString()} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setCheckedPublisher(e.target.value)}
              value={checkedPublisher}
              className="browser-default"
            >
              <option value="">Выберите издательство</option>
              {publisher.publishers.map((p) => (
                <option key={p.id.toString()} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setCheckedCategory(e.target.value)}
              value={checkedCategory}
              className="browser-default"
            >
              <option value="">Выберите категорию</option>
              {category.categories.map((c) => (
                <option key={c.id.toString()} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="book__container">
        {book.books.map((b) => (
          <BookCard
            key={b.id.toString()}
            book={b}
            onOpen={openHandler}
            onChange={changeHandler}
            onDelete={deleteHandler}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  )
})

export default BookPage
