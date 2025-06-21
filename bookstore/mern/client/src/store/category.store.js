import { makeAutoObservable } from 'mobx'

export default class CategoryStore {
  constructor() {
    this._categories = []
    makeAutoObservable(this)
  }

  setCategories(value) {
    this._categories = value
  }

  get categories() {
    return this._categories
  }

  addCategory(category) {
    this._categories.push(category)
  }

  changeCategory(changed) {
    this._categories = this._categories.map((category) =>
      category._id === changed._id ? changed : category
    )
  }

  deleteCategory(id) {
    this._categories = this._categories.filter(({ _id }) => _id !== id)
  }
}
