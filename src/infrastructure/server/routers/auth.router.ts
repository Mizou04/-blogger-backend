import passport from "passport"
import Google from "passport-google-oauth20"
import "dotenv/config"
import { Errback, ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express";
import { DBError, InvalidInputError } from "@/common/customErrors";
import express from "express"
import { UserVM } from "@/ViewModels/UserVM";
import User from "@/Entities/User";
import helmet from "helmet";
import GetUser from "@/interactors/getUser.interactor";
import GetUserPresenter from "@/presenters/user/GetUser.Presenter";
import userRepository from "@/repositories/User.repository";
import SetUser from "@/interactors/setUser.interactor";
import SetUserPresenter from "@/presenters/user/SetUser.presenter";



let googleAuthRouter = express.Router();

googleAuthRouter.use(helmet({
  crossOriginResourcePolicy: process.env.NODE_ENV !== 'development',
  crossOriginOpenerPolicy : process.env.NODE_ENV !== 'development',
  xssFilter : true
}))

const GoogleStrategy = Google.Strategy;

googleAuthRouter.use(passport.initialize());
googleAuthRouter.use(passport.session());

let getUser = new GetUser(new GetUserPresenter(), userRepository)    
let setUser = new SetUser(new SetUserPresenter(), userRepository)    


async function getOrCreateUserWithGoogle(
  req : Request,
  accessToken : string,
  refreshToken : string,
  profile : Google.Profile, 
  cb : Google.VerifyCallback){
    try{
      /**
       * if user doesn't exist this function call will throw an Error of DBError type
       * else will return a user instance and we quit this code block
      */

      let existedUser : UserVM = await getUser.execute({userParams : {providerId : profile.id}, complete : true});
      (req.res as Response).locals["isNewUser"] = false;
      return cb(null, existedUser);
    } catch (e){
      if(e instanceof DBError){
        try {
          /**
           * we catch DBError errors and handle them by creating a new user
           */
            let result = await setUser.execute({
              providerId : profile.id,
              email : profile.emails![0].value,
              name : profile._json.name || "user"+profile.id.slice(0,6),
              username : profile?._json.name || "user"+profile.id.slice(0,6),
              profilePic : profile.photos![0].value,
            });
            (req.res as Response).locals["isNewUser"] = true;

            /**
             * if result == null means our user creation has succeeded else will throw error so we have to rethrow it
             */
            if(result == null){
              try{
                let newUser = await getUser.execute({userParams : {providerId : profile.id}, complete: true});
                return cb(null, newUser);
              } catch (e){
            /**
             * we rethrow the error because we don't want to handle it here
             */
                throw e
              }
            }
          } catch (error) {
            // and here we handle the error
            if(error instanceof DBError) return console.log({title : error.title, message : error.message});
            cb(error as Error);
          }
      } else {
        cb(e as Error)
      }
    }
}


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID + "",
    clientSecret : process.env.CLIENT_SECRET + "",
    passReqToCallback : true,
    callbackURL: "http://localhost:4000/authentication/google/callback",
  }, getOrCreateUserWithGoogle)
);

passport.serializeUser((user : Express.User, done)=>{
  done(null, user)
})
passport.deserializeUser((obj : UserVM, done)=>{
  // getUser.execute({id : obj.id}).then(u=>{
    done(null, obj)
  // })
})


googleAuthRouter.get('/authentication/google',
  passport.authenticate('google', { scope: ['profile', 'email'], prompt : "select_account" }));

googleAuthRouter.get('/authentication/google/callback', 
  passport.authenticate('google', {failureRedirect: 'http://localhost:8080/signup'}),
  function(req : Request<{authenticatedUser : UserVM}, {}, {authenticatedUser : UserVM}, {authenticatedUser : UserVM}>, res, next) {
    res.redirect("http://localhost:8080/response");
    console.log("user in req object: ",req.user, req.res?.locals["isNewUser"]);
  });

// googleAuthRouter.use((req, res, next)=>{
//   // (req.cookies && req.user) && res.redirect("http://localhost:8080/modify-profile");
//   console.log(req.cookies)
// })

// googleAuthRouter.use((req, res, next)=>{
//   res.setHeader("set-cookie", `isNewUser=${isNewUser}`)
// })



googleAuthRouter.post('/logout', (req, res)=>{
  req.logOut();
  if(req.user){
    req.session.destroy((err)=>{
      if(err) return res.status(400).send({title : "error", msg : err.message})
      res.redirect(process.env.NODE_ENV == "production" ? "/" : "http://localhost:8080/")
    })
  } else {
    res.redirect(process.env.NODE_ENV == "production" ? "/" : "http://localhost:8080/")
  }
})



export default googleAuthRouter;