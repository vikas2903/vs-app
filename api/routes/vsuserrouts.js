import { Router } from "express";
import { vsuserdatainsertion, vsuserlogin, vsuserlogout } from "../controllers/vsuserscontroller.js";
import authMiddleware from "../middlewares/vsauth.js";
const vsuserRoutes = Router();

vsuserRoutes.post("/vsinsertuserdata", vsuserdatainsertion);
vsuserRoutes.post("/vsuserlogin", vsuserlogin);
vsuserRoutes.post("/vsuserlogout", vsuserlogout);

// Protected route - requires valid JWT token
vsuserRoutes.get("/profile", authMiddleware, (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

export default vsuserRoutes;