import React, {Component} from 'react'
import Book from './Book'


function BookShelf(props){
    const {books,category,categoryName,updateCategory}=props;
    return ( 
    <div className="bookshelf">
        <h2 className="bookshelf-title">{categoryName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book=>{
                        return <li key={book.id}>
                            <Book book={book}  updateCategory={updateCategory}/>
                        </li>
                    })}
            </ol>
        </div>
    </div>
    )
}
export default BookShelf