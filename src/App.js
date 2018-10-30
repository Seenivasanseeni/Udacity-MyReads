import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf';
import {Route,Link} from 'react-router-dom'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  
  constructor(){
    super();
    this.updateCategory=this.updateCategory.bind(this);
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
/*      //testing purpose
        var curTestIndex=1;
        var curTestobject=this.state.books[curTestIndex];
        console.log("Initial Object  ", curTestobject.title, "is in ",curTestobject.shelf);
        this.updateCategory(curTestobject.id,"read");
        console.log("Initial Object  ", curTestobject.title, "is in ",curTestobject.shelf);
    */
       })
  }
  updateCategory(bookId,toCategory){
    console.log("For",bookId,"Cat",toCategory);
    toCategory=toCategory.trim();
    this.setState((prevState)=>{
       return {
          books: prevState.books.map(book=>{
            if(book.id==bookId)
              book.shelf=toCategory;
            return book;
            })
      }
    })
  }
  render() {
    console.log(this.state.books);
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
            <BookShelf books={wantToReadBooks} categoryName={"Want To Read"} category="wantToRead" updateCategory={this.updateCategory}/>
            <BookShelf books={currentlyReadingBooks} categoryName="Currently Reading" category="currentlyReading" updateCategory={this.updateCategory} />
            <BookShelf books={readBooks} categoryName={"Read"} category="read" updateCategory={this.updateCategory} />
            <BookShelf books={noneBooks} categoryName={"Not Assigned"} category="none" updateCategory={this.updateCategory} />
          </div>
        </div>
        <div className="open-search">
          <Link to="search" onClick={({history})=>{
            history.pushState("/");
          }} >Add a book</Link>
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
            <SearchBooks books={this.state.books} updateCategory={this.updateCategory} />
          )
        }} />
      </div>
    )
  }
}

export default BooksApp
