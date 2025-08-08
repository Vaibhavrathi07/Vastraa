const jwt = require("jsonwebtoken");
const userSchema = require("../models/user.model.js");

const generatedRefreshToken = async (userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "30d" }
  );

  await userSchema.findOneAndUpdate(
    { userId },
    { refreshToken: token },
    { new: true }
  );

  return token;
};

module.exports = generatedRefreshToken;

