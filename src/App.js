import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf';
import Route from 'react-router-dom'

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
    console.log(this);
    const readBooks=this.state.books.filter(book=>book.shelf.trim()=="read");
    const currentlyReadingBooks=this.state.books.filter(book=>book.shelf.trim()=="currentlyReading");
    const wantToReadBooks=this.state.books.filter(book=>book.shelf.trim()=="wantToRead");
    const noneBooks=this.state.books.filter(book=>book.shelf.trim()!=="wantToRead"&&book.shelf.trim()!=="currentlyReading"&&book.shelf.trim()!=="read");
 
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
