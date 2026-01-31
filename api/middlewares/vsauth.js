import { verifyToken } from '../lib/vsjwtouth.js';

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });

  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ success: false, message: 'Invalid or expired token' });

  req.user = payload; // { id, email, name, iat, exp }
  next();
};

export default authMiddleware;