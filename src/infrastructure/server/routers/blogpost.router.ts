import { Response, Request, NextFunction, Router } from "express";
import {blogpostFactory} from "@/factories/Blogpost.factory"
import { DBError, InvalidInputError } from "@/common/customErrors";
import { BlogPost, TBlogpost } from "@/Entities/BlogPost";

const getBlogPost = blogpostFactory.makeGetPost();
const setBlogPost = blogpostFactory.makeSetPost();

function secureThis(req : Request, res : Response, next : NextFunction){
  let {user} = req; 
  if(user){
    return next();
  } else {
    return res.redirect(403, "http://localhost:8080/signup");
  }
}

const blogPostRouter = Router();

blogPostRouter.get("/articles/:articleId", async (req, res, next)=>{
  let {articleId} = req.params;
  try {
    let response = await getBlogPost.execute({key : "id", value : articleId});
    if(response && response.id == articleId){
      res.json(response);
    }
  } catch (error) {
    next(error)
  }
})
blogPostRouter.post("/articles/new", secureThis, async (req, res, next)=>{
  let body : TBlogpost = req.body;
  body = JSON.parse(Object.keys(body)[0]);
  console.log(33, body);
  try {
    await setBlogPost.execute(body);
    console.log(36, body)
    return res.json({title : "Success", msg : "Article added successfuly"})
  } catch (err) {
    next(err)
  }
})

export default blogPostRouter