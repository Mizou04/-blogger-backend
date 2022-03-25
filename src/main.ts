import express, { NextFunction, Request, Response } from "express"
import getUserMiddleware from "./Infrastructure/Server/middlewares/getUserMiddleware";
import {logErrorMiddleware, returnErrorMiddleware, logError} from "@/Infrastructure/Server/middlewares/errorsMiddlewares"
import { writeFile } from "fs";

let app = express();

app.use(logErrorMiddleware)

app.use("/user", getUserMiddleware)


app.listen(3000, ()=>{
  console.log("you are listening at port:3000")
})
