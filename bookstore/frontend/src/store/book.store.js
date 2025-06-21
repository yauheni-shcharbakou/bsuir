import { makeAutoObservable } from 'mobx'

export default class BookStore {
  constructor() {
    this._books = []
    this._favorites = []
    this._notify = []
    this._current = {}
    makeAutoObservable(this)
  }

  setBooks(value) {
    this._books = value
  }

  setFavorites(value) {
    this._favorites = value
  }

  setCurrent(id) {
    this._current = this.findBook(id)
  }

  setNotify(value) {
    const set = new Set()
    value.forEach((v) => set.add(v))
    this._notify = Array.from(set)
  }

  get books() {
    return this._books
  }

  get current() {
    return this._current
  }

  get favorites() {
    return this._favorites
  }

  get notify() {
    return this._notify
  }

  findBook(bookId) {
    return this._books.find(({ id }) => id === bookId)
  }

  addBook(book) {
    this._books.push(book)
  }

  changeBook(changed) {
    this._books = this._books.map((book) => (book.id === changed.id ? changed : book))
  }

  deleteBook(bookId) {
    this._books = this._books.filter(({ id }) => id !== bookId)
  }

  toggleFavoriteBook(book) {
    if (this.isFavorite(book)) {
      this._favorites = this._favorites.filter(({ id }) => id !== book.id)
    } else {
      this._favorites.push(book)
    }
  }

  isFavorite(book) {
    return this._favorites.map(({ id }) => id).includes(book.id)
  }
}
