import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ShelfChanger extends Component {
  handleShelfChange = (event) => {
    const { book, changeShelf } = this.props
    const shelf = event.target.value

    changeShelf(book, shelf)
  }

  render() {
    const { currentShelf } = this.props

    return (
      <div className="book-shelf-changer">
        <select value={currentShelf} onChange={this.handleShelfChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

ShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  currentShelf: PropTypes.string.isRequired,
  changeShelf: PropTypes.func.isRequired,
}

export default ShelfChanger