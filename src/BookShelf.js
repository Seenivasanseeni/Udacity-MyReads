import React, {Component} from 'react'
import Book from './Book'


class BookShelf extends Component {
      
    updateCategoryHanlder=(bookId,category)=>{
        this.props.updateCategory(bookId,category);
    }  

    render(){
        console.log(this);
        const {books,category,categoryName,updateCategory}=this.props;
        return ( 
        <div className="bookshelf">
            <h2 className="bookshelf-title">{categoryName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book=>{
                            return <li key={book.id}>
                                <Book book={book}  updateCategory={this.updateCategoryHanlder} />
                            </li>
                        })}
                </ol>
            </div>
        </div>
        )
    }
}
export default BookShelf