import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookShelf = (props) => {
  const { shelf, booksOnShelfs, changeShelf } = props

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksOnShelfs.map((book) => (
            (book.shelf === shelf.id) &&
            <Book
              key={book.id}
              book={book}
              currentShelf={book.shelf}
              changeShelf={changeShelf}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  booksOnShelfs: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
}

export default BookShelf