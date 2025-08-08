import React from 'react'
import { Link } from 'react-router-dom'
import backgroundImage from '../assets/photo-1483985988355-763728e1935b.jpeg'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
    
      <div className='flex items-center justify-center p-3'>
        <Link className='text-black pt-3 mx-15 font-medium text-xl hover:text-gray-600' to={"/Men"}>Men</Link>
        <Link className='text-black pt-3 mx-15 font-medium text-xl hover:text-gray-600' to={"/women"}>Women</Link>
        <Link className='text-black pt-3 mx-15 font-medium text-xl hover:text-gray-600' to={"/kids"}>Kids</Link>
      </div>

      {/* New content added below */}
      <div className="hero-section py-60 px-4 text-center" style={{ 
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Our Store</h1>
        <p className="text-lg text-white">Discover a wide range of products for men, women, and kids.</p>
        <button onClick={() => navigate("/Women")} className=' text-white px-4 py-2 rounded my-4'>Shop Now</button>
      </div>
    </div>
  )
}

export default Home