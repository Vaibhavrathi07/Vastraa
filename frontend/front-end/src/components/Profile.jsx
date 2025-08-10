import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';


export default function Profile() {
  const { user, updateUser } = useOutletContext();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/user/update-Details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      updateUser(data.user); // Update global user state
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-form">
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Name"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="Email"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
export { Profile };