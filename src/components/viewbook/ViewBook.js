import React from 'react' 
import { useEffect ,useState} from 'react'  
import { useParams } from 'react-router-dom'; 
import  './ViewBook.css'

function ViewBook() {
    const { bookId } = useParams();
    const [bookdetails,setBookDetails]=useState({}) 
    const [loader, setLoader]= useState(true)
    console.log(bookId)

    useEffect(()=>{
        const viewDetailsFetching= async ()=>{
            console.log(bookId)
            try {
              const response = await fetch(`https://book-management-backend-2.onrender.com/book-details/${bookId}`);
              if (response.ok) {
                const data= await response.json() 
               setBookDetails(data)
               setLoader(false)
              } else {
                console.error('Failed to fetch book');
              }
            } catch (error) {
              console.error('Error fetching  book:', error);
            }
          };
        viewDetailsFetching()

    },[]);

  return (
    loader ? <p>loading...</p>:<div className="book-details-container">
    <button className="back-button" onClick={() => window.history.back()}>
      &larr; Back
    </button>
    <div className="card">
      <h1>{bookdetails.Title}</h1>
      <p><strong>Author:</strong> {bookdetails.AuthorName}</p>
      <p><strong>Genre:</strong> {bookdetails.GenreName}</p>
      <p><strong>Pages:</strong> {bookdetails.Pages}</p>
      <p><strong>Published Date:</strong> {bookdetails.PublishedDate}</p>
      <p><strong>Description:</strong> {bookdetails.GenreDescription}</p>
    </div>
  </div>
  )
}
export default ViewBook