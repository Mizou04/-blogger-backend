import express from "express"
import helmet from "helmet";
import cors from "cors";
import session from "express-session"
import "dotenv/config"
import userRouter from "./infrastructure/server/routers/user.router";
import '@/infrastructure/db/config'
import mongoose from "mongoose";
import googleAuthRouter from "./infrastructure/server/routers/auth.router";
let app = express();

mongoose.connection.once('open', ()=>{
  console.log('DATABASE connected')
})
mongoose.connection.once('error', (err)=>{
  console.log('DATABASE ERROR ocurred ', err)
})

app.use(helmet())
app.use(cors({
  origin : "*",
  methods : ["GET", "POST", "PUT", "DELETE"],
  preflightContinue : true,
  // allowedHeaders : ["Access-Control-Allow-Origin", `Access-Control-Request-Headers`] 
}))
app.use(express.urlencoded({extended : true}))
app.use(express.json());

const SESSION = session({
  name : "userSession",
  secret : process.env.SESSION_SECRET as string,
  cookie : {
            maxAge : Infinity,
            secure : "auto"
          },
  resave : false,
  saveUninitialized : false
})

app.use(SESSION)
app.use(userRouter);
app.use(googleAuthRouter);


// app.get('/', (req, res : Response<any, {authenticatedUser : UserVM}>, n)=>{
//   res.json(res.locals.authenticatedUser)
// })


const PORT = 4000;


app.listen(PORT, ()=>{
  console.log("you are listening at port ", PORT)
})