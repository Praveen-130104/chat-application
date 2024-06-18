import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
 function verifyToken(req, res, next) {
    const secretKey = process.env.SECRET_KEY;
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(403).json({ error: 'Token not provided' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
  
      req.userId = decoded.userId;
      next();
    });
  }
export default verifyToken;
  