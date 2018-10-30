import React from 'react'
import BookShelf from './BookShelf';
import escapeRegExp from 'escape-string-regexp'
import {Link} from 'react-router-dom'

class SearchBooks extends React.Component {

  state={
    query:''
   }

  updateQuery(queryFromUser){
    this.setState({
        query:queryFromUser.trim()
    })
  }
  clearQuery(){
      this.setState({
          query:''
      })
  }
  
  getMatchingBooks(){
      var matcher=new RegExp(escapeRegExp(this.state.query),'i');
      var matchedBooks=this.props.books.filter(book=>matcher.test(book.title));
      return matchedBooks;
  }
  
  updateCategoryHanlder=(bookId,category)=>{
    this.props.updateCategory(bookId,category);
  }  

  render() {
    const matchedBooks=this.getMatchingBooks();
    return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(e)=>this.updateQuery(e.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
               <BookShelf categoryName="Search Results" books={matchedBooks}  updateCategory={this.updateCategoryHanlder}/>
            </div>
          </div>
    )
  }
}

export default SearchBooks
