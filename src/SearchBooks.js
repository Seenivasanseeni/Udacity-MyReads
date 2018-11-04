import React from 'react'
import BookShelf from './BookShelf';
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {

  constructor(props){
    super();
    this.updateQuery =  this.updateQuery.bind(this);
    this.setState=this.setState.bind(this);
  }

  state={
    query:"",
    curBooks:[],
    books:[]
  }

  updateQuery(queryFromUser){
    const query = queryFromUser;
    this.setState({
      books:[],
      curBooks:this.props.books,
      query:query
    },this.populateSearchResults);
  }

  clearQuery(){
      this.setState({
          books:[],
          curBooks:this.props.books,
          query:''
      })
      this.populateSearchResults();
  }

  populateSearchResults(){
    const query=this.state.query.trim();
    BooksAPI.search(query).then(books=>{
      //console.log("for query" ,query,"From Network",books);
      if(books==undefined || books.error){
        console.log("No matching Results for query ",query);
        this.setState({
          books:[]
        })
        return;
      }
      //synchronize the shelf values
      books=books.map(book=>{
        var existingBook=this.state.curBooks.filter(curBook=>curBook.id==book.id);
        if(existingBook.length==1){
          book.shelf=existingBook[0].shelf;
        }
        return book;
      })
      this.setState({
        books
      })  
    }).catch((err)=>{
      console.log("Error ",err);
    })
  }
  
  render() {
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
               <BookShelf categoryName="Search Results" books={this.state.books} updateBook={this.props.updateBook} />
            </div>
          </div>
    )
  }
}

export default SearchBooks
