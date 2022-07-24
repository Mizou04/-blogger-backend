import express, { NextFunction, ErrorRequestHandler, Request, Response } from "express"
import helmet from "helmet";
import cors from "cors";
import session, {MemoryStore} from "express-session"
import "dotenv/config"
import userRouter from "./infrastructure/server/routers/user.router";
import '@/infrastructure/db/config'
import mongoose from "mongoose";
import googleAuthRouter from "./infrastructure/server/routers/auth.router";
import path from "path";

const app = express();
const WHITE_LIST = ["http://localhost:8080","localhost:8080"] 

mongoose.connection.once('open', ()=>{
  console.log('DATABASE connected')
})
mongoose.connection.once('error', (err)=>{
  console.log('DATABASE ERROR ocurred ', err)
})

app.use(path.join(__dirname, ))

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

// app.all("*", (q, r)=>{
//   r.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
//   r.setHeader('Access-Control-Allow-Origin', 'localhost:8080')
// })

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


app.use(SESSION)
app.use((err : Error, req : Request, res : Response, next : NextFunction)=>{
  console.log("err MiddleWare : ", err.message);
  res.status(404).json({title : err.name, message : err.message});
  next()
})


app.use(userRouter);
app.use(googleAuthRouter);

app.use((err : Error, req : Request, res : Response, next : NextFunction)=>{
  console.log("err MiddleWare : ", err.message);
  res.status(404).json({title : err.name, message : err.message});
  next()
})



app.get('/', (req, res)=>{
  if(req.user){
    console.log(req.user)
    return res.status(200).json(req.user)
  }
})

const PORT = 4000;


app.listen(PORT, ()=>{
  console.log("you are listening at port ", PORT)
})