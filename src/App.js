import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import Contact from './components/common/Contact';
import About from './components/common/About';
import AddBook from './components/addbook/AddBook';
import SearchResults from './components/searchresults/SearchResults'; 
import ViewBook from './components/viewbook/ViewBook';
import EditBook from './components/common/editBook/EditBook';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/contact" element={<Contact/>}/> 
        <Route path="/about" element={<About/>}/> 
        <Route path="/addbook" element={<AddBook/>}/> 
        <Route path="/search" element={<SearchResults/>}/> 
        <Route path="/book-details/:bookId" element={<ViewBook/>}/> 
        <Route path="/edit-book/:bookId" element={<EditBook/>}/> 
      </Routes>
    </Router>
    
  );
}

export default App;
