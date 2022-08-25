import { Response, Request, NextFunction, Router } from "express";
import {blogpostFactory} from "@/factories/Blogpost.factory"
import { DBError, InvalidInputError } from "@/common/customErrors";
import { BlogPost, TBlogpost } from "@/Entities/BlogPost";
import { Range } from "@/common/Range";
import { BlogPostMinVM, BlogPostVM } from "@/ViewModels/BlogPostVM";

const getBlogPost = blogpostFactory.makeGetPost();
const getBlogPostsGroup = blogpostFactory.makeGetPostsGroup();
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

blogPostRouter.get("/article/:articleId", async (req, res, next)=>{
  let {articleId} = req.params;
  try {
    let data : BlogPostVM = await getBlogPost.execute({key : "id", value : articleId});
    if(data && data.id == articleId){
      res.json({data});
    }
  } catch (error) {
    next(error)
  }
})
blogPostRouter.post("/articles/new", secureThis, async (req, res, next)=>{
  let body : TBlogpost = req.body;
  try {
    await setBlogPost.execute(body);
    return res.json({title : "Success", msg : "Article added successfuly"})
  } catch (error) {
    next(error)
  }
})

blogPostRouter.get("/articles/:from-:to", async (req, res, next)=>{
  try {
    let {from, to} = req.params;
    let range = new Range(Number(from), Number(to));
    let data : BlogPostMinVM[] = await getBlogPostsGroup.execute(range);
    res.json({data});
  } catch (error) {
    next(error)
  }
})

export default blogPostRouter