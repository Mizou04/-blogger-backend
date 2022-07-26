import express, { NextFunction, ErrorRequestHandler, Request, Response } from "express"
import helmet from "helmet";
import cors from "cors";
import "dotenv/config"
import userRouter from "./infrastructure/server/routers/user.router";
import '@/infrastructure/db/config'
import mongoose from "mongoose";
import googleAuthRouter from "./infrastructure/server/routers/auth.router";
import path from "path";
import session, {MemoryStore} from "express-session"
import cookieParser from "cookie-parser";

import { UserVM } from "./viewmodels/userVM";

const app = express();
const WHITE_LIST = ["http://localhost:8080","localhost:8080"];
const SESSION = session({
  name : "userSession",
  secret : process.env.SESSION_SECRET as string,
  cookie : {
            maxAge : 1000 * 60 * 24 * 7,
            secure : false
          },
  resave : false,
  saveUninitialized : false,
  store : new MemoryStore({captureRejections : true})
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
app.use(userRouter);
app.use(googleAuthRouter);

app.use((err : Error, req : Request, res : Response, next : NextFunction)=>{
  console.log("err MiddleWare : ", err.message);
  res.status(404).json({title : err.name, message : err.message});
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