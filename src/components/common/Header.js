import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; 
import { useEffect , useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [authors, setAuthors]= useState([]) 
  const [genres,setGenres] = useState([])  
   const [selectAuthor,setSelectAuthor]=useState('') 
   const [selectGenre, setSelectGenre]=useState('')
   const [searchtext,setSearchText]=useState('')
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



    const onClickSearch=()=>{
      navigate('/search',{ state: { searchtext, selectAuthor, selectGenre } }) 
      setSearchText('') 
      setSelectAuthor('')
      setSelectGenre('')
    }
  

  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top p-3">
  <Container>
    <Navbar.Brand href="/">Books</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      {/* Navigation Links */}
      <Nav
        className="d-flex justify-content-center w-100 my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/contact">Contact</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/addbook">AddBook</Nav.Link>
      </Nav>

      {/* Search Form */}
      <Form className="d-flex align-items-center gap-2" style={{ width: '500px' }}>
        {/* Author Dropdown */}
        <Form.Group controlId="author" className="flex-grow-1">
          <Form.Select
            className="form-control"
            value={selectAuthor}
            onChange={(e) => setSelectAuthor(e.target.value)}
          >
            <option>Select Author</option>
            {authors.map((each) => (
              <option key={each.AuthorId} value={each.AuthorId}>
                {each.NAME}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Genre Dropdown */}
        <Form.Group controlId="genre" className="flex-grow-1">
          <Form.Select
            className="form-control"
            value={selectGenre}
            onChange={(e) => setSelectGenre(e.target.value)}
          >
            <option>Select Genre</option>
            {genres.map((each) => (
              <option key={each.GenreId} value={each.GenreId}>
                {each.Name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Search Input */}
        <Form.Control
          type="search"
          placeholder="Search"
          className="flex-grow-1"
          aria-label="Search"
          value={searchtext} 
          onChange={(e)=>setSearchText(e.target.value)}
        />
        {/* Search Button */}
        <Button variant="outline-success" onClick={onClickSearch}>Search</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>

    
  );
}

export default Header;