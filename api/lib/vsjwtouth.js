import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
  };
    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: '1h',
    };
    return jwt.sign(payload, secret, options);
};
export const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    try {
      return jwt.verify(token, secret);     
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }   
};