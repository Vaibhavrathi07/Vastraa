const bcrypt = require("bcryptjs");
const userSchema = require("../models/user.model");
const { v4: uuid } = require("uuid");
const generatedAccessToken = require("../utils/GeneratedAccessToken");
const generatedRefreshToken = require("../utils/GeneratedRefreshToken");
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");

const registerallusers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailExists = await userSchema.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password too short" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userSchema({
      userId: uuid(),
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

   

    

    res.status(201).json({ message: "User registered", data: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const user = await userSchema.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(401).json({ error: "Invalid credentials" });

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    // **Save refreshToken in DB for user**
    user.refreshToken = refreshToken;
    await user.save();

    const cookieOptions = {
      secure: true,
      sameSite: "none",
      httpOnly: true,
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      message: "Login successfully",
      data: user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logoutController = async (req, res) => {
  try {
   const userid = req.user.id;

res.clearCookie("accessToken");
res.clearCookie("refreshToken");

await userSchema.findOneAndUpdate(
  { _id: userid }, 
  { refreshToken: "" }
);



    res.status(200).json({ 
        message: "Logout successfully",
       success: true
       
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id; 

    // Find and update user
    const updatedUser = await userSchema.findByIdAndUpdate(userId,{
        ...(name && { name:name }),
        ...(email && { email:email }),
    }
    );
    return res.status(200).json({ 
        message: "User updated",
         data: updatedUser 
        });
            
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    
    await updatedUser.save();

    res.status(200).json({ message: "User updated", data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const UserDetails = async (req, res) => {
  try {
    console.log("User ID from token:", req.user?.id);
    
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: "User ID not found in request" });
    }

    const user = await User.findById(userId).select("-password -__v");
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("UserDetails Error:", error);
    res.status(500).json({ 
      error: "Failed to fetch user details",
    });
  }
};

const adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASS){
        const token=jwt.sign(email+password,process.env.SECRET_KEY_ACCESS_TOKEN);
        res.status(200).json({message:"Login successfully",Token:token});
    }
    else{
        res.status(401).json({ error: "Invalid credentials" });
    }

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { registerallusers, loginController,logoutController,updateUser,UserDetails,adminLoginController };
