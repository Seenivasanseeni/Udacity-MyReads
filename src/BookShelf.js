import React, {Component} from 'react'
import Book from './Book'


function BookShelf(props){
    const {books,category}=props;
    console.log(books.length);
    return ( 
    <div className="bookshelf">
        <h2 className="bookshelf-title">{category}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book=>{
                        return <li>
                            <Book book={book} />
                        </li>
                    })}
            </ol>
        </div>
    </div>
    )
}
export default BookShelf