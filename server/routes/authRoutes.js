import express from "express";
import { login, logout, signup,mycart,addtocart, dltfromcart } from "../controllers/authControllers.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/signup",signup);
router.post("/signin",login);
router.post("/logout",logout);
router.get("/mycart",protectRoute,mycart);
router.post("/addtocart",protectRoute,addtocart);
router.post("/dfcart",protectRoute,dltfromcart);

export default router;