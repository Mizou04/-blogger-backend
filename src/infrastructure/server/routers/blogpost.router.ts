import { GetBlogPostInputPort, GetBlogPostOutputPort } from "@/interactors/getBlogPost.interactor";
import { getExistedBlogPostsLengthInputPort, getExistedBlogPostsLengthOutputPort } from "@/interactors/getBlogPostsLength.interactor";
import { getBlogPostsGroupInputPort, getBlogPostsGroupOutputPort } from "@/interactors/getBlogpostsGroup.interactor";
import { SetBlogPostInputPort, SetBlogPostOutputPort } from "@/interactors/setBlogPost.interactor";

<<<<<<< HEAD
import blogPostRepository from "@/repositories/BlogPost.repository";
import userRepository from "@/repositories/User.repository";
=======
const getBlogPost = blogpostFactory.makeGetPost();
const getBlogPostsGroup = blogpostFactory.makeGetPostsGroup();
const setBlogPost = blogpostFactory.makeSetPost();
const getBlogPostsLength = blogpostFactory.makeGetPostsLength();
>>>>>>> origin/cleanup




<<<<<<< HEAD
// import { Response, Request, NextFunction, Router } from "express";
// import {blogpostFactory} from "@/factories/Blogpost.factory"
// import { DBError, InvalidInputError } from "@/common/customErrors";
// import { BlogPost, BlogPostContent} from "@/Entities/BlogPost";
// import { Range } from "@/common/Range";
// import { BlogPostMinVM, BlogPostVM } from "@/ViewModels/BlogPostVM";
=======
blogPostRouter.get("/articles/:from-:to", async (req, res, next)=>{
  try {
    let {from, to} = req.params;
    let range = new Range(Number(from), Number(to));
    let data : BlogPostMinVM[] = await getBlogPostsGroup.execute(range);
    res.json({data, overAllLength : await getBlogPostsLength.execute()});
  } catch (error) {
    next(error)
  }
})
>>>>>>> origin/cleanup

// const getBlogPostsGroup = blogpostFactory.makeGetPostsGroup();
// const getBlogPostsLength = blogpostFactory.makeGetPostsLength();

// const getBlogPost = blogpostFactory.makeGetPost();
// const getBlogPostContent = blogpostFactory.makeGetPostContent();

// const setBlogPost = blogpostFactory.makeSetPost();
// const setBlogPostContent = blogpostFactory.makeSetPostContent();

// function secureThis(req : Request, res : Response, next : NextFunction){
//   let {user} = req; 
//   if(user){
//     return next();
//   } else {
//     return res.redirect(403, "http://localhost:8080/signup");
//   }
// }

// const blogPostRouter = Router();

// blogPostRouter.get("/article/:articleId", async (req, res, next)=>{
//   let {articleId} = req.params;
//   try {
//     let meta : BlogPostVM = await getBlogPost.execute({key : "id", value : articleId});
//     let content : BlogPostContent = await getBlogPostContent.execute(articleId);
//     let data = Object.assign(meta, content);
//     if(data && data.id == articleId){
//       res.json({data});
//     }
//   } catch (error) {
//     next(error)
//   }
// })
// blogPostRouter.post("/articles/new", secureThis, async (req, res, next)=>{
//   let body : BlogPost & BlogPostContent = req.body;
//   try {
//     await setBlogPost.execute(body);
//     await setBlogPostContent.execute(body)
//     return res.json({title : "Success", msg : "Article added successfuly"})
//   } catch (error) {
//     next(error)
//   }
// })

// blogPostRouter.get("/articles/:from-:to", async (req, res, next)=>{
//   try {
//     let {from, to} = req.params;
//     let range = new Range(Number(from), Number(to));
//     let data : BlogPostMinVM[] = await getBlogPostsGroup.execute(range);
//     res.json({data, overAllLength : await getBlogPostsLength.execute()});
//   } catch (error) {
//     next(error)
//   }
// })

// export default blogPostRouter