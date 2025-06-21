import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store'
import { categoryApi } from '../api'
import CategoryCard from '../components/cards/category.card'
import { observer } from 'mobx-react-lite'

const CategoryPage = observer(() => {
  const { category } = useContext(Context)
  const [name, setName] = useState('')
  const [current, setCurrent] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    categoryApi
      .getAll()
      .then((response) => category.setCategories(response))
      .catch((e) => console.error(e))
  }, [])

  const createSubmitHandler = () => {
    if (name) {
      categoryApi
        .create(name)
        .then((response) => {
          category.addCategory(response)
          setName('')
        })
        .catch((e) => alert(e.response.data.message || e))
    } else {
      alert('Неверная информация')
    }
  }

  const changeSubmitHandler = () => {
    if (name) {
      categoryApi
        .change(current, name)
        .then((response) => {
          category.changeCategory(response)
          setIsEdit(false)
          setCurrent('')
          setName('')
        })
        .catch((e) => alert(e.response.data.message || e))
    } else {
      alert('Неверная информация')
    }
  }

  const changeHandler = (currentCategory) => {
    setCurrent(currentCategory.id)
    setIsEdit(true)
    setName(currentCategory.name)
  }

  const deleteHandler = (currentCategory) => {
    categoryApi
      .delete(currentCategory.id)
      .then((response) => category.deleteCategory(response))
      .catch((e) => console.error(e))
  }

  return (
    <div className="content">
      <h2>Управление категориями</h2>
      <div className="form">
        <label>
          <input
            type="text"
            value={name}
            placeholder="Название категории"
            onInput={(e) => setName(e.target.value)}
          />
        </label>
        <button className="btn" onClick={isEdit ? changeSubmitHandler : createSubmitHandler}>
          {isEdit ? 'Изменить категорию' : 'Создать категорию'}
        </button>
      </div>
      <div className="card__container">
        {category.categories.map((c) => (
          <CategoryCard
            key={c.id.toString()}
            category={c}
            onChange={changeHandler}
            onDelete={deleteHandler}
          />
        ))}
      </div>
    </div>
  )
})

export default CategoryPage
