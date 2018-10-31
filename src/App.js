import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf';
import {Route,Link} from 'react-router-dom'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  
  constructor(){
    super();
    this.setState=this.setState.bind(this);
  }

  state = {
    books:[] 
  }

  componentDidMount(){
    BooksAPI.getAll().then(books=>{
      this.setState({
        books
      })
    })
  }
  
  render() {
    const readBooks=this.state.books.filter(book=>book.shelf.trim()=="read");
    const currentlyReadingBooks=this.state.books.filter(book=>book.shelf.trim()=="currentlyReading");
    const wantToReadBooks=this.state.books.filter(book=>book.shelf.trim()=="wantToRead");
    const noneBooks=this.state.books.filter(book=>book.shelf.trim()!=="wantToRead"&&book.shelf.trim()!=="currentlyReading"&&book.shelf.trim()!=="read");
    var listBooks=  (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf books={wantToReadBooks} categoryName={"Want To Read"}  />
            <BookShelf books={currentlyReadingBooks} categoryName="Currently Reading"  />
            <BookShelf books={readBooks} categoryName={"Read"}   />
            <BookShelf books={noneBooks} categoryName={"Not Assigned"}   />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" >Add a book</Link>
        </div>
    </div>
    );
    return (
      <div className="app">
        <Route exact path="/" render={()=>{
          return listBooks;
        }} />
        <Route path="/search" render={()=>{
          return (
            <SearchBooks books={this.state.books} />
          )
        }} />
      </div>
    )
  }
}

export default BooksApp
