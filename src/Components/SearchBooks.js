import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class SerchBooks extends Component {
  state = {
    query: '',
    searchResults: [],
  }

  performSearch = (query) => {
    if (query !== '') {
      BooksAPI.search(query)
      .then((books) => {
        this.setState(() => ({
          searchResults: books,
        }))
      })
    } else {
      this.setState({ searchResults: [] })
    }
  }

  updateQuery = (event) => {
    const { value } = event.target

    clearTimeout(this.timerId)
    this.timerId = setTimeout(() => {
      this.setState(() => ({
        query: value.trim(),
      }))
      this.performSearch(value)
    }, 500)
  }

  currentShelf = (bookId) => {
    const { booksOnShelfs } = this.props
    const book = booksOnShelfs.find(book => book.id === bookId)
    
    return book ? book.shelf : "none" 
  }

  focusInput = (inputEl) => {
    inputEl && inputEl.focus()
  }

  render() {
    const { searchResults } = this.state
    const { changeShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              ref={this.focusInput}
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              (searchResults && !searchResults.error)
                ? searchResults.map((book) => (
                    <Book
                      key={book.id}
                      book={book}
                      currentShelf={this.currentShelf(book.id)}
                      changeShelf={changeShelf}
                    />
                  ))
                : <div>
                    No books found
                  </div>
            }
          </ol>
        </div>
      </div>
    )
  }
}

SerchBooks.propTypes = {
  booksOnShelfs: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
}

export default SerchBooks