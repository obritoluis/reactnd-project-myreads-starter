import React from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger'

const Book = (props) => {
  const { book, currentShelf, changeShelf } = props
  const cover = book.imageLinks ? book.imageLinks.smallThumbnail : ''
  const title = book.title ? book.title : ''
  const authors = book.authors && book.authors

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${cover})` }}></div>
          <ShelfChanger
            book={book}
            currentShelf={currentShelf}
            changeShelf={changeShelf}
          />
        </div>
        <div className="book-title">
          {title}
        </div>
        <div className="book-authors">
          {authors && authors.map((author) => (
            <div key={author}>
              {author}
            </div>
          ))}
        </div>
      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  currentShelf: PropTypes.string.isRequired,
  changeShelf: PropTypes.func.isRequired,
}


export default Book