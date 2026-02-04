import express from "express";
import { eventsinsertion } from "../controllers/eventscontroller.js";
const eventsRoutes = express.Router();
eventsRoutes.post("/insertion", eventsinsertion);
export default eventsRoutes;