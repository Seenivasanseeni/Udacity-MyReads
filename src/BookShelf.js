import React, {Component} from 'react'
import Book from './Book'


class BookShelf extends Component {
      
     

    render(){
        const {books,categoryName,refreshApp}=this.props;
        return ( 
        <div className="bookshelf">
            <h2 className="bookshelf-title">{categoryName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book=>{
                            return <li key={book.id}>
                                <Book book={book} refreshApp={refreshApp} />
                            </li>
                        })}
                </ol>
            </div>
        </div>
        )
    }
}
export default BookShelf