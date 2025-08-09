export default async function handler(req, res) {
  // 1. Allow your frontend to access this API
  res.setHeader('Access-Control-Allow-Origin', 'https://vastraa-ten.vercel.app');
  
  // 2. Allow POST requests
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  
  // 3. Handle the registration
  if (req.method === 'POST') {
    const { registerallusers } = require('../../../controllers/user.controller');
    return registerallusers(req, res);
  }
  
  // 4. Block other request types
  return res.status(405).end(); 
}
