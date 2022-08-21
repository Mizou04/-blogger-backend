import express, { NextFunction, ErrorRequestHandler, Request, Response } from "express"
import helmet from "helmet";
import cors from "cors";
import userRouter from "./infrastructure/server/routers/user.router";
import mongoose from "mongoose";
import googleAuthRouter from "./infrastructure/server/routers/auth.router";
import blogPostRouter from "./infrastructure/server/routers/blogpost.router";
import session, {MemoryStore} from "express-session"
import cookieParser from "cookie-parser";
import "dotenv/config"
import '@/infrastructure/db/config'

import { UserVM } from "./viewmodels/userVM";
import { DBError, InvalidInputError } from "./common/customErrors";

const app = express();
const WHITE_LIST = ["http://localhost:8080","localhost:8080"];
const SESSION = session({
  name : "userSession",
  secret : process.env.SESSION_SECRET as string,
  cookie : {
            maxAge : 1000 * 60 * 60 * 24 * 1,
            secure : false
          },
  resave : false,
  saveUninitialized : false,
});

mongoose.connection.once('open', ()=>{
  console.log('DATABASE connected')
})
mongoose.connection.once('error', (err)=>{
  console.log('DATABASE ERROR ocurred ', err)
})


app.use(helmet({
  crossOriginResourcePolicy: process.env.NODE_ENV !== 'development',
  crossOriginOpenerPolicy : process.env.NODE_ENV !== 'development',
  xssFilter : true
}))
app.use(cors({origin : WHITE_LIST,
              credentials : true,
              preflightContinue : true,
              methods : ["GET", "POST", "PUT", "DELETE"],
            }));
app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(SESSION)
app.use(cookieParser())


app.use(googleAuthRouter);
app.use(userRouter);
app.use(blogPostRouter);

app.use((err : any, req : Request, res : Response, next : NextFunction)=>{
    console.log("err MiddleWare : ", JSON.stringify(err.message));
    if(err instanceof DBError || err instanceof InvalidInputError){
      res.status(404).json({title : err.name, message : err.message});
    } else {
    console.log(JSON.stringify(err));
    res.status(500).send("Server Exception 500")
  }
})

app.get('/', (req, res)=>{
  if(req.user){
    res.status(200).json({
      user : req.user,
      articles : [{title : "ss", content:"ssssss"}, {title : "dd", content:"dddddd"}]
    });
  } else {
    res.json({articles : [{title : "ss", content:"ssssss"}, {title : "dd", content:"dddddd"}]});
  }
})


const PORT = 4000;


app.listen(PORT, ()=>{
  console.log("you are listening at port ", PORT)
})