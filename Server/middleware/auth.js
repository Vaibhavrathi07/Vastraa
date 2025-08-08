const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    
 try {
 const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    if(!decode){
        return res.status(401).json({ error: "Unauthorized" });
    }
       req.user = { id: decode.id };
      next();



 } catch (error) {
    res.status(500).json({ error: error.message });
 }
}
module.exports = auth