import React from 'react'
import Header from './Header'

function Contact() {
  return (
   <>
   <Header/>
   <div className="contact-page">
  <div className="contact-container">
    <h1>Contact Us</h1>
    <p>We’d love to hear from you! Feel free to reach out for any questions, feedback, or support.</p>
    <form className="contact-form">
      <input type="text" placeholder="Your Name" className="form-input" required />
      <input type="email" placeholder="Your Email" className="form-input" required />
      <textarea placeholder="Your Message" className="form-textarea" rows="5" required></textarea>
      <button type="submit" className="form-button">Send Message</button>
    </form>
  </div>
</div>


   </>
  )
}

export default Contact