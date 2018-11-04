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
    this.updateBook=this.updateBook.bind(this);
    this.addBook=this.addBook.bind(this);
  }

  state = {
    books:[],
  }

  componentDidMount(){
    this.populateBooks();  
  }

  addBook(book,shelf){
    console.log("Adding book");
    book.shelf=shelf;
    this.setState(prevState=>{
      return {
        books: prevState.books.concat(book)
      }
    })
  }

  updateBook(book,shelf){
    //check if book exists in the state
    if(this.state.books.filter(bo=>{return bo.id===book.id}).length==0){
      //book doesnt exist so add it to the state;
      this.addBook(book,shelf);
      return
    }
    this.setState((prevState)=>{
      return {
        books: prevState.books.map(curBook=>{
          if(curBook.id==book.id){
            console.log("Book found",book.id,shelf);
            curBook.shelf=shelf;
          }
          return curBook;
        })
      } 
    })
    console.log("Updating book");
  }
  

  populateBooks(){
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
            <BookShelf books={wantToReadBooks} categoryName={"Want To Read"} updateBook={this.updateBook} />
            <BookShelf books={currentlyReadingBooks} categoryName="Currently Reading" updateBook={this.updateBook} />
            <BookShelf books={readBooks} categoryName={"Read"}  updateBook={this.updateBook} />
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
            <SearchBooks updateBook={this.updateBook} books={this.state.books}/>
          )
        }} />
      </div>
    )
  }
}

export default BooksApp
