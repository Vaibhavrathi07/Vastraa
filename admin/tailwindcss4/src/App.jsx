import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './pages/add';
import List from './pages/list';
import Orders from './pages/orders';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || "");



  return (
    token === "" ? (
      <Login setToken={setToken} />
    ) : (
      <div className='flex' >
        <Navbar setToken={setToken} />
        <div className='flex'>
          <Sidebar />
          <div className="flex-1 p-4 ml-64">  
            <Routes>
              <Route path="/" element={<Navigate to="/list-items" replace />} />
              <Route path="/add" element={<Add Token={token}/>} />
            <Route path="/list-items" element={<List Token={token} />} />
              <Route path="/orders" element={<Orders Token={token} />} />

              <Route path="*" element={<Navigate to="/list-items" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    )
  );
};

export default App;