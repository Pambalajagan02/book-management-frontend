import React from 'react'

import Header from './Header'

function About() {
  return (
   <>
   <Header/>
   <div className="about-page">
  <div className="about-content">
    <h1>About Book Management System</h1>
    <p>
      Welcome to the Book Management System, your ultimate solution for managing and exploring a vast collection of books effortlessly. 
      Our platform empowers users to search, view details, and manage book records with ease, offering a seamless experience for book enthusiasts and administrators alike.
    </p>
    <p>
      Whether you're looking for your next great read or managing a library of books, our system is designed with user-friendliness and efficiency in mind. 
      Enjoy features like advanced search filters, detailed book descriptions, and intuitive management tools to add, edit, or delete book records.
    </p>
    <p>
      Start exploring today and discover how simple and enjoyable book management can be!
    </p>
  </div>
</div>

   
   </>
  )
}

export default About