export default async function fetchUserDetails() {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.log('No access token found');
      return null;
    }
    const apiUrl = import.meta.env.VITE_API_URL;

    const response = await fetch(`${apiUrl}/api/user/details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('User details response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
}