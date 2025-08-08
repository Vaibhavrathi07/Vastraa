const jwt = require('jsonwebtoken');
const userSchema = require("../models/user.model.js");


const generatedAccessToken = (userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_ACCESS_TOKEN,
    { expiresIn: '5h' }
  );
  return token;
};

module.exports = generatedAccessToken;
