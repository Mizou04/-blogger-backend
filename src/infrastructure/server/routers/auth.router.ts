import passport from "passport"
import Google from "passport-google-oauth20"
import "dotenv/config"
import { Errback, ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express";
import { userFactory } from "@/factories/User.factory";
import { DBError, InvalidInputError } from "@/common/customErrors";
import express from "express"
import { UserVM } from "@/viewmodels/userVM";
import User from "@/Entities/User";

let googleAuthRouter = express.Router();

const GoogleStrategy = Google.Strategy;


googleAuthRouter.use(passport.initialize());
googleAuthRouter.use(passport.session())


let getUser = userFactory.makeGetUser(), setUser = userFactory.makeSetUser();

async function getOrCreateUser(
  req : Request,
  accessToken : string,
  refreshToken : string,
  profile : Google.Profile, 
  cb : Google.VerifyCallback){
    try{
      let existedUser : UserVM = await getUser.execute({providerId : profile.id});
      return cb(null, existedUser);
    } catch (e){
      if(e instanceof DBError){
        try {
            let result = await setUser.execute({
              providerId : profile.id,
              email : profile.emails![0].value,
              name : profile._json.name! || "user"+profile.id.slice(0,6),
              username : profile?.username || "user"+profile.id.slice(0,6)
            })
            if(result == null){
              try{
                let newUser = await getUser.execute({providerId : profile.id});
                return cb(null, newUser);
              } catch (e){
                throw e
              }
            }
          } catch (error) {
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
  }, getOrCreateUser)
);

passport.serializeUser((user : Express.User, done)=>{
  done(null, user)
})
passport.deserializeUser((obj : UserVM, done)=>{
  done(null, obj)
})


googleAuthRouter.use((err : Error, req : Request, res : Response, next : NextFunction)=>{
  console.log("err MiddleWare : ", err.message);
  res.status(404).json({title : err.name, message : err.message})
})

googleAuthRouter.get('/authentication/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

googleAuthRouter.get('/authentication/google/callback', 
  passport.authenticate('google', {failureRedirect: 'http://localhost:8080/authentication/signin'}),
  function(req : Request<{authenticatedUser : UserVM}, {}, {authenticatedUser : UserVM}, {authenticatedUser : UserVM}>, res, next) {
    console.log("user in req object: ",req.user);
    // let responseHTML = `<html><head><title>Main</title></head><body></body><script>let res = ${JSON.stringify({
    //       user: req.user
    //   })}; window.opener.postMessage(res, "*"); window.close();</script></html>`
    // res.send(responseHTML);
    // // res.redirect('/')
    res.send(req.user)
  });

  googleAuthRouter.get('/logout', (req, res, next)=>{
    req.logOut();
  })


export default googleAuthRouter;