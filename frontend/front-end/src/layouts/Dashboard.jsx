import React from 'react'
import Profile from '../pages/Profile'

const Dashboard = () => {
  return (
    <div display="flex flex-row">
     <h1 className='text-2xl text-gray-800 flex justify-center m-10'>Account </h1> 

      <Profile  />
    </div>
  )
}

export default Dashboard
