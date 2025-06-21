import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Placeholder from '../components/placeholder'
// import { Context } from '../store'
// import { bookApi, userApi } from '../api'
// import FavoriteCard from '../components/cards/favorite.card'

const FavoritePage = observer(() => {
  // const { user, book } = useContext(Context)
  //
  // useEffect(() => {
  //   userApi
  //     .getBooks(user.user._id)
  //     .then((response) => {
  //       book.setFavorites(response)
  //
  //       bookApi
  //         .getAll()
  //         .then((response) => book.setBooks(response))
  //         .catch((e) => console.error(e))
  //     })
  //     .catch((e) => console.error(e))
  // }, [])
  //
  // const clickHandler = (currentBook) => {
  //   book.toggleFavoriteBook(currentBook)
  //   userApi
  //     .changeBooks(
  //       user.user._id,
  //       book.favorites.map(({ _id }) => _id)
  //     )
  //     .then()
  //     .catch((e) => console.error(e))
  // }

  return (
    <div className="content">
      <h2>Управление избранными книгами</h2>
      {/*<div className="card__container">*/}
      {/*  {book.books.map((b) => (*/}
      {/*    <FavoriteCard*/}
      {/*      key={b._id}*/}
      {/*      book={b}*/}
      {/*      isAdded={book.isFavorite(b)}*/}
      {/*      onClick={clickHandler}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}
      <Placeholder />
    </div>
  )
})

export default FavoritePage
