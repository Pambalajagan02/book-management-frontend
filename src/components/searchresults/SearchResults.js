import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Table, Pagination } from 'react-bootstrap';
import './serach.css';
import Header from '../common/Header';

function SearchResults() {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();
  const { searchtext, selectAuthor, selectGenre } = location.state || {}; 

  useEffect(() => {
    const fetchSearchResults = async () => {   
      try {
        const queryUrl = `https://book-management-backend-2.onrender.com/search?searchText=${searchtext}&authorId=${selectAuthor}&genreId=${selectGenre}`;
        const response = await fetch(queryUrl);
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
          // Calculate total pages based on the total number of books
          setTotalPages(Math.ceil(data.length / itemsPerPage)); 
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearchResults();
  }, [searchtext, selectAuthor, selectGenre,itemsPerPage]);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const paginatedBooks = books.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle actions
  const handleViewDetails = (bookId) => {
    navigate(`/book-details/${bookId}`);
  };

  const handleEdit = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');

    if (!confirmDelete) {
      return; // Exit the function if the user cancels
    }
    try {
      const response = await fetch(`https://book-management-backend-2.onrender.com/delete-book/${bookId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBooks(books.filter((book) => book.BookID !== bookId));
      } else {
        console.error('Failed to delete book');
        alert('Failed to delete book')
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5 pt-4">
        <h1>Search Results</h1>
        {books.length > 0 ? (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Pages</th>
                  <th>Published Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBooks.map((book) => (
                  <tr key={book.BookID}>
                    <td>{book.Title}</td>
                    <td>{book.Pages}</td>
                    <td>{book.PublishedDate}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleViewDetails(book.BookID)}
                        className="me-2"
                      >
                        View
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEdit(book.BookID)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(book.BookID)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </>
        ) : (
          <p>No books found. Try adjusting your filters or search term.</p>
        )}
      </div>
    </>
  );
}

export default SearchResults;
