import { makeAutoObservable } from 'mobx'

export default class AuthorStore {
  constructor() {
    this._authors = []
    makeAutoObservable(this)
  }

  setAuthors(value) {
    this._authors = value
  }

  get authors() {
    return this._authors
  }

  addAuthor(author) {
    this._authors.push(author)
  }

  changeAuthor(changed) {
    this._authors = this._authors.map((author) =>
      author._id === changed._id ? changed : author
    )
  }

  deleteAuthor(id) {
    this._authors = this._authors.filter(({ _id }) => _id !== id)
  }
}
