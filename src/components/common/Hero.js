import React from 'react'
import './common.css'
import {Link} from 'react-router-dom'
function Hero() {
  return (
    <section class="hero-section">
  <div class="hero-content">
    <h1>Welcome to the Book Management System</h1>
    <p>Effortlessly manage your book collection and keep track of your reading journey.</p>
   <Link to="/addbook"> <button type="button" >Add your book.</button></Link>
  </div>
</section>

  )
}

export default Hero