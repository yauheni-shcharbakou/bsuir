import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store'
import { publisherApi } from '../api'
import { observer } from 'mobx-react-lite'
import PublisherCard from '../components/cards/publisher.card'

const PublisherPage = observer(() => {
  const { publisher } = useContext(Context)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [current, setCurrent] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    publisherApi
      .getAll()
      .then((response) => publisher.setPublishers(response))
      .catch((e) => console.error(e))
  }, [])

  const createSubmitHandler = () => {
    if (name && address) {
      publisherApi
        .create(name, address)
        .then((response) => {
          publisher.addPublisher(response)
          setName('')
          setAddress('')
        })
        .catch((e) => alert(e.response.data.message || e))
    } else {
      alert('Неверная информация')
    }
  }

  const changeSubmitHandler = () => {
    if (name && address) {
      publisherApi
        .change(current, name, address)
        .then((response) => {
          publisher.changePublisher(response)
          setIsEdit(false)
          setCurrent('')
          setName('')
          setAddress('')
        })
        .catch((e) => alert(e.response.data.message || e))
    } else {
      alert('Неверная информация')
    }
  }

  const changeHandler = (currentPublisher) => {
    setCurrent(currentPublisher.id)
    setIsEdit(true)
    setName(currentPublisher.name)
    setAddress(currentPublisher.address)
  }

  const deleteHandler = (currentPublisher) => {
    publisherApi
      .delete(currentPublisher.id)
      .then((response) => publisher.deletePublisher(response))
      .catch((e) => console.error(e))
  }

  return (
    <div className="content">
      <h2>Управление издательствами</h2>
      <div className="form">
        <label>
          <input
            type="text"
            value={name}
            placeholder="Имя издательства"
            onInput={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            value={address}
            placeholder="Адрес издательства"
            onInput={(e) => setAddress(e.target.value)}
          />
        </label>
        <button className="btn" onClick={isEdit ? changeSubmitHandler : createSubmitHandler}>
          {isEdit ? 'Изменить издательство' : 'Создать издательство'}
        </button>
      </div>
      <div className="card__container">
        {publisher.publishers.map((p) => (
          <PublisherCard
            key={p.id.toString()}
            publisher={p}
            onChange={changeHandler}
            onDelete={deleteHandler}
          />
        ))}
      </div>
    </div>
  )
})

export default PublisherPage
