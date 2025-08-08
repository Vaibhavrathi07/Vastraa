import React from 'react'

const Footer = () => {
  return (
   <footer className='border-t'>
  <div className='container mx-auto p-4'>
    <p>Copyright &copy; {new Date().getFullYear()}</p>
  </div>
   </footer>
  )
}

export default Footer
