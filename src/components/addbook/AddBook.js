import React from 'react'
import './index.css'
import { useEffect, useState } from 'react' 
import { useNavigate } from 'react-router-dom'

function AddBook() {
  const [authors, setAuthors]= useState([]) 
  const [genres,setGenres] = useState([])
  const [selectAuthor,setSelectAuthor]=useState('') 
  const [selectGenre, setSelectGenre]=useState('')
  const [bookTitle,setBookTitle] = useState('')
  const [Pages,setPages]= useState(0 ) 
  const [date , setDate]= useState('') 
  const [error,setError] = useState('')
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchingAuthorsAndGenres= async ()=>{

     try{
      const authorUrl= "https://book-management-backend-2.onrender.com/addbook/authors";
      const genresurl ="https://book-management-backend-2.onrender.com/addbook/genres";
      const authorResponse= await fetch(authorUrl)
      const genresResponse= await fetch(genresurl)
      if(authorResponse.ok && genresResponse.ok){
        const authors=  await authorResponse.json()
        const genres= await genresResponse.json() 
        setAuthors(authors)
        setGenres(genres)

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


  const validateAddemployee=()=>{
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

 const onSubmitAddEmployee= async (e)=>{
  e.preventDefault() 
  const addDetails={bookTitle,selectAuthor,selectGenre,Pages,date} 

  if(!validateAddemployee()){
    return
  } 

  try{
    const addurl='https://book-management-backend-2.onrender.com/addbook' 
    const options={ 
      method:"POST",
      headers:{
         'Content-Type': 'application/json',
      },
      body:JSON.stringify(addDetails)
    }
    const addresponse= await fetch(addurl,options)
    if(addresponse.ok){
      console.log(addresponse.status)  
      navigate('/')

    }
  }catch(errors){ 
    console.log(errors)

  }
  }
  return (
    
    <div className="container-fluid form-main-container">
          <h2>Add your book</h2> 
          <form className='form-container' onSubmit={onSubmitAddEmployee}>

            <div className="mb-3">
              <label htmlFor="Title" className="form-label" >Book Title</label>
              <input type="text" className="form-control" id="Title" placeholder='Enter book title.' value={bookTitle} onChange={(e)=>setBookTitle(e.target.value)} required/>
            </div>


            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author</label>
              <select  className="form-control" id="author" value={selectAuthor} onChange={(e)=>setSelectAuthor(e.target.value)}> 
              <option>Select an option</option>
                {authors.map((each)=><option key={each.AuthorId} value={each.AuthorId}>{each.NAME}</option>)}
              </select>
            </div>


            <div className="mb-3">
              <label htmlFor="author" className="form-label">Genres</label>
              <select  className="form-control" id="author" value={selectGenre} onChange={(e)=>setSelectGenre(e.target.value)}>
                <option>Select an option</option>
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

            <button type="submit" className="btn btn-primary">Submit</button> 
            {error &&<p style={{color:"red"}}>{error}</p>}
           
          </form>
          
        </div>
  )
}

export default AddBook