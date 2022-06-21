import express, { NextFunction, Request, Response } from "express"
import helmet from "helmet";
import cors from "cors";
// import userRouter from "./Infrastracture/server/routers/UserRouter";
import session from "express-session"
import passport, { Profile } from "passport"
import Google,{AuthenticateOptionsGoogle, GoogleCallbackParameters } from "passport-google-oauth20"
import "dotenv/config"
import User from "./Entities/User";
import userRouter from "./infrastructure/server/routers/user.router";
import '@/infrastructure/db/config'
import mongoose from "mongoose";
// import {  getUserFromFile } from "./Infrastracture/db/handlers/userHandlers";
// import { User } from "./Entities/User";
// import { getUserById } from "./Infrastracture/server/handlers/userHandlers";
// import { GetUserController } from "./controllers/UserController";
// import { UserControllersFactory } from "./Factories/UserControllersFactory";
// import { UserVM } from "./viewmodels/userVM";
// import cookieParser from "cookie-parser"
// import { IMessage } from "./common/IMessage";
// import db from "./Infrastracture/db/config";
// // import {} from "body"
let app = express();
// let randomStringOfLength6orMore = new Array(10).fill(Math.random()*265-100).join("");
// export let database = db();

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
// app.use(cookieParser());
const SESSION = session({
  name : "userSession",
  secret : process.env.SESSION_SECRET as string,
  cookie : {
            maxAge : 20000,
            secure : "auto"
          },
  resave : false,
  saveUninitialized : false
})
app.use(SESSION)


// let getUserController = UserControllersFactory.makeGetUserByCriteria();
// let setUserController = UserControllersFactory.makeSetUserByCriteria();

let GoogleStrategy = Google.Strategy;
// function userStrategy(req : Request, res : Response, next : NextFunction){
//   req.user = {id : 123}
//   next();
// }

app.use(passport.initialize());
app.use(passport.session())

// async function authUser(req: Request<{}, {}, {}, {}>, accessToken : string, refreshToken : string, profile : Google.Profile, cb : Google.VerifyCallback) {
//     try{
//       let u : UserVM | IMessage= await getUserController.onGetUser({criteria : "providerID", value : profile.id}) as UserVM;
//       if(u instanceof UserVM){
//         cb(null, u)
//       } else {
//         let message = await setUserController.onSetUser({providerID : profile.id, username : profile.username+"", email : (profile.emails || [{value : ""}])[0].value, isAdmin : false, name : profile.name?.givenName + "", profilePic: (profile.photos || [{value : ""}])[0].value});
//         if(message.status === "Success"){
//           u = await getUserController.onGetUser({criteria : "providerID", value : profile.id}) as UserVM;
//           cb(null, u);
//         } else {
//           throw new Error('SOMETHING NOT INTENDED')
//         }
//       }
//     } catch(e){
//       cb(e as Error);
//     }
// }
// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID + "",
//     clientSecret : process.env.CLIENT_SECRET + "",
//     passReqToCallback : true,
//     callbackURL: "http://localhost:4000/authentication/google/callback",
//   }, authUser)
// );

// passport.serializeUser((user, done)=>{
//   done(null, user)
// })
// passport.deserializeUser((obj : User, cb)=>{
//   cb(null, obj)
// })

// app.get('/authentication/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// app.get('/authentication/google/callback', 
//   passport.authenticate('google', {failureRedirect: 'http://localhost:8080/authentication/signin' }),
//   async function(req : Request<{authenticatedUser : UserVM}, {}, {authenticatedUser : UserVM}, {authenticatedUser : UserVM}>, res, next) {
//     let user = await getUserController.onGetUser({criteria : "providerID", value : (req.user as {id : string}).id })
//     // Successful authentication, redirect home.
//     // let user = {id : req.id}
//     // res.locals.authenticatedUser = user as UserVM;
//     // //@ts-ignore
//     // console.log("74", req.session.passport.user)
//     // res.redirect('http://localhost:8080/');
//     var responseHTML = '<html><head><title>Main</title></head><body></body><script>let res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
//     responseHTML = responseHTML.replace('%value%', JSON.stringify({
//         user: req.user
//     }));
//     next();
//   });


app.get('/logout', (req, res, next)=>{
  req.logOut();
  next();
})

// app.get('/', (req, res : Response<any, {authenticatedUser : UserVM}>, n)=>{
//   res.json(res.locals.authenticatedUser)
// })

app.use(userRouter);

const PORT = 4000;


app.listen(PORT, ()=>{
  console.log("you are listening at port ", PORT)
})