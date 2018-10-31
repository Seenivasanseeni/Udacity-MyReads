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
    books:[]
  }

  updateQuery(queryFromUser){
    const query = queryFromUser.trim();
    //console.log("Updating query ",this.state.query,"due to ",queryFromUser);
    this.setState({
      query:query
    })
    //console.log("Updating query ",this.state.query,"due to ",queryFromUser);
    //console.log(this.state);
    this.populateSearchResults(query);
  }

  clearQuery(){
      this.setState({
          query:''
      })
  }

  populateSearchResults(query){
    BooksAPI.search(query).then(books=>{
      console.log("for query" ,query,"From Network",books);
      if(books==undefined || books.error){
        console.log("No matching Results");
        return;
      }
      this.setState({
        books
      })  
    }).catch((err)=>{
      //console.log("Error ",err);
    })
  }
  
  render() {
    //console.log("books passed",this.state);
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
               <BookShelf categoryName="Search Results" books={this.state.books} />
            </div>
          </div>
    )
  }
}

export default SearchBooks
