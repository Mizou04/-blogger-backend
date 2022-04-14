import express from "express";
import {getUserById, setUser} from "../handlers/userHandlers";

let userRouter = express.Router();

userRouter.get("/users/:id", getUserById)
userRouter.post("/users", setUser)

export default userRouter