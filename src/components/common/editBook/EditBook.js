import React from 'react' 
import { useEffect,useState } from 'react' 
import { useParams ,useNavigate} from 'react-router-dom'; 




function EditBook() { 
     const { bookId } = useParams();
     console.log(bookId)
    const [authors, setAuthors]= useState([]) 
      const [genres,setGenres] = useState([])
      const [selectAuthor,setSelectAuthor]=useState('') 
      const [selectGenre, setSelectGenre]=useState('')
      const [bookTitle,setBookTitle] = useState('')
      const [Pages,setPages]= useState(0 ) 
      const [date , setDate]= useState('') 
      const [error,setError] = useState('') 
      const navigate = useNavigate()
    

    useEffect(()=>{
        const fetchingAuthorsAndGenres= async ()=>{
            console.log(bookId)

         try{
          const authorUrl= "https://book-management-backend-2.onrender.com/addbook/authors";
          const genresurl ="https://book-management-backend-2.onrender.com/addbook/genres"; 
          const previousUrl= `https://book-management-backend-2.onrender.com/book-details/${bookId}`;
          const authorResponse= await fetch(authorUrl);
          const genresResponse= await fetch(genresurl);
          const detailsResponse= await fetch(previousUrl)
          if(authorResponse.ok && genresResponse.ok && detailsResponse.ok){
            console.log("------------------------------------------hey")
            const authors=  await authorResponse.json();
            const genres= await genresResponse.json();
            const data= await detailsResponse.json();
            console.log(data)
            setAuthors(authors)
            setGenres(genres) 
            setSelectAuthor(data.AuthorName)  
            console.log(data.AuthorName)
            setSelectGenre(data.GenreName) 
            setBookTitle(data.Title) 
            setPages(data.Pages)
          }
          else{
            console.log(`Failed to fetch: ${authorResponse.status} or ${genresResponse.status}`)
          }
         } catch(error){
          console.error("Error fetching authors or genres:", error);
         }
        }
        fetchingAuthorsAndGenres()
      },[]) 


      const validateUpdateBook=()=>{
        const isValid = /^[a-zA-Z\s]+$/.test(bookTitle); 
        if(!isValid){
          setError("Only letters and spaces are allowed.")
          return false
        } 
        else{
          setError('')
          return true
        }
      }
    
     const onSubmitUpdateBooks= async (e)=>{
      e.preventDefault() 
      const updateDetails={bookTitle,selectAuthor,selectGenre,Pages,date} 
    
      if(!validateUpdateBook()){
        return
      } 
    
      try{
        const addurl=`https://book-management-backend-2.onrender.com/edit-book/${bookId}`
        const options={ 
          method:"PUT",
          headers:{
             'Content-Type': 'application/json',
          },
          body:JSON.stringify(updateDetails)
        }
        const updateresponse= await fetch(addurl,options)
        if(updateresponse.ok){
          console.log(updateresponse.status)  
          alert("Book updated successfully") 
          navigate('/')

        }
      }catch(errors){ 
        console.log(errors)
    
      }
      }

    
  return (
    <div className="container-fluid  form-main-container">
          <h2>update your book</h2> 
          <form className='form-container' onSubmit={onSubmitUpdateBooks}>

            <div className="mb-3">
              <label htmlFor="Title" className="form-label" >Book Title</label>
              <input type="text" className="form-control" id="Title" placeholder='Enter book title.' value={bookTitle} onChange={(e)=>setBookTitle(e.target.value)} required/>
            </div>


            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author</label>
              <select  className="form-control" id="author" value={selectAuthor} onChange={(e)=>setSelectAuthor(e.target.value)}> 
             
                {authors.map((each)=><option key={each.AuthorId} value={each.AuthorId}>{each.NAME}</option>)}
              </select>
            </div>


            <div className="mb-3">
              <label htmlFor="author" className="form-label">Genres</label>
              <select  className="form-control" id="author" value={selectGenre} onChange={(e)=>setSelectGenre(e.target.value)}>
               
                {genres.map((each)=><option key={each.GenreId} value={each.GenreId}>{each.Name}</option>)}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="pages" className="form-label" >pages</label>
              <input type="number" className="form-control" id="pages" placeholder='Enter number of pages.' value={Pages} onChange={(e)=>setPages(e.target.value)} required/>
            </div>

            <div className="mb-3">
              <label htmlFor="date" className="form-label" >Published Date</label>
              <input type="date" className="form-control" id="date" value={date} onChange={(e)=>setDate(e.target.value)} required/>
            </div>

            <button type="submit" className="btn btn-primary">Update</button> 
            {error &&< p style={{color:"red"}}>{error}</p>}
           
          </form>
          
        </div>
  )
}

export default EditBook