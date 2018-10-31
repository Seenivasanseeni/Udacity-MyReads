import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component{
    updateCategoryHanlder=(e)=>{
        BooksAPI.update(this.props.book,e.target.value).then(()=>{
            console.log("Refreshing");
            this.props.refreshApp();
        });
    }  
    render(){
        const {book}=this.props;
        return (
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ 
                        width: 128, height: 193, backgroundImage:  `url(${book.imageLinks!=undefined && book.imageLinks.thumbnail })`
                        }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.updateCategoryHanlder}>
                        <option value="move" disabled>Move to...</option>
                        <option value="none">None</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>                      
        )
    }
}
export default Book