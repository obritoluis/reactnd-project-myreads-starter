import React from 'react'
import './App.css'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './Components/SearchBooks'
import BookShelf from './Components/BookShelf'

class BooksApp extends React.Component {
  state = {
    shelfs: [
      {id: 'currentlyReading', title: 'Currenty Reading'},
      {id: 'wantToRead', title: 'Want to Read'},
      {id: 'read', title: 'Read'},
    ],
    books: [],
  }
  
  getBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books,
        }))
      })
  }

  changeShelf = (bookObj, newShelf) => {
    const { books } = this.state
    const bookIds = books.map(book => book.id)

    if (bookIds.includes(bookObj.id)) {
      const booksUpdated = books.flatMap((book) => {
        return book.id !== bookObj.id ? book :
               newShelf === 'none' ? [] : {...book, shelf: newShelf}
      })

      this.setState({
        books: booksUpdated
      })
    } else {
      this.setState((prevState) => ({
        books: [...prevState.books, {...bookObj,  shelf: newShelf}]
      }))
    }

    BooksAPI.update({id: bookObj.id}, newShelf)
  }

  componentDidMount() {
    this.getBooks()
  }

  render() {
    const { shelfs, books } = this.state

    return (
      <div className="app">
        <Route path="/search">
          <SearchBooks
            booksOnShelfs={books}
            changeShelf={this.changeShelf}
          />
        </Route>
        <Route exact path="/">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelfs.map((shelf) => (
                  <BookShelf
                    key={shelf.id}
                    shelf={shelf}
                    booksOnShelfs={books}
                    changeShelf={this.changeShelf}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        </Route>
      </div>
    )
  }
}

export default BooksApp
