import express, { NextFunction, ErrorRequestHandler, Request, Response, request, response } from "express"
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import session, {MemoryStore} from "express-session"
// import userRouter from "./infrastructure/server/routers/user.router";
// import googleAuthRouter from "./infrastructure/server/routers/auth.router";
// // import blogPostRouter from "./infrastructure/server/routers/blogpost.router";
import cookieParser from "cookie-parser";
import "dotenv/config"
// import '@/infrastructure/db/config'

// import { UserVM } from "./viewmodels/userVM";
import { DBError, InvalidInputError } from "./common/customErrors";
// // import { blogpostFactory } from "./factories/Blogpost.factory";
// import { Range } from "./common/Range";
// import { GetUserController } from "./controllers/common/BaseController";

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

// mongoose.connection.once('open', ()=>{
//   console.log('DATABASE connected')
// })
// mongoose.connection.once('error', (err)=>{
//   console.log('DATABASE ERROR ocurred ', err)
// })


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

// app.use(googleAuthRouter);
// app.use(userRouter);
// app.use(blogPostRouter);

app.use((req, res, next)=>{
  res.locals.isNewUser = true;

  next();
})

// app.get("/authentication/user", (req, res)=>{
//   if(true){
//     let userVM : UserVM = {
//       id: 'ad0865d3e9bc4bdf9989f692890517c3',
//       providerId: '112926625730383377490',
//       username: 'No One',
//       name: 'No One',
//       email: 'mizou04owl@gmail.com',
//       joinedAt: 'Sat Sep 17 2022 20:31:11 GMT+0100 (GMT+01:00)',
//       lastModified: 'Sat Sep 17 2022 20:31:11 GMT+0100 (GMT+01:00)',
//       blogPosts: undefined
//     };
//     res.json({data : userVM, isNewUser : res.locals.isNewUser});
//     res.locals.isNewUser = false;
//   } else {
//     res.redirect(process.env.NODE_ENV == "development" ? "http://localhost:8080/" : "/");
//   }
// })

// app.get('/', (req, res, next)=>{
//   res.send('hi ...');
// })


app.use((err : any, req : Request, res : Response, next : NextFunction)=>{
  console.log("err MiddleWare : ", JSON.stringify((err as Error).stack));
  if(err instanceof DBError || err instanceof InvalidInputError){
    res.status(404).json({title : err.title, msg : err.message});
  } else {
  console.log(JSON.stringify(err));
  res.status(500).send("Server Internal Error")
}
})

const PORT = 4000;


app.listen(PORT, ()=>{
  console.log("you are listening at port ", PORT)
})