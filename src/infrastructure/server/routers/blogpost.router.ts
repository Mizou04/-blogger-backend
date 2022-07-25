import { Response, Request, NextFunction, Router } from "express";
import {blogpostFactory} from "@/factories/Blogpost.factory"

const getPost = blogpostFactory.makeGetPost();

function secureThis(req : Request, res : Response, next : NextFunction){
  let {user} = req; 
  if(user){
    return next();
  } else {
    return res.redirect("http://localhost:8080/signup");
  }
}

const postRouter = Router();

postRouter.get("articles/:articleId", (req, res)=>{
  
})
// postRouter.post("articles/new", (req, res)=>{

// })