import React, { useState, useEffect } from 'react';
import fetchUserDetails from '../../utils/fetchUserDetails';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const data = await fetchUserDetails();
      if (data?.data) {
        setUser(data.data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">No user data available. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Profile Details</h1>
          </div>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {user.name || 'Not provided'}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm font-medium text-gray-500">Email address</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {user.email || 'Not provided'}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm font-medium text-gray-500">Role</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {user.role || 'Not provided'}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm font-medium text-gray-500">Phone Number</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {user.phone || 'Not provided'}
              </p>
            </div>

            <div className="pb-4">
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {user.address || 'Not provided'}
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;