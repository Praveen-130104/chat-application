import express from "express";
import { SignUp } from "../controller/Signup.js";
import { Login } from "../controller/Login.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);



export default router;