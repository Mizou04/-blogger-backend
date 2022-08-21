import { GetBlogpostController } from "@/controllers/getBlogPost.controller";
import GetBlogPostInteractor from "@/interactors/getBlogPost.interactor";
import SetBlogPostInteractor from "@/interactors/setBlogPost.interactor";
import { GetBlogpostPresenter } from "@/presenters/getBlogPost.presenter";
import { BlogPostRepository } from "@/repositories/BlogPost.repository";

import {SetBlogpostPresenter} from "@/presenters/setBlogPost.presenter"
import {SetBlogPostController} from "@/controllers/setBlogPost.controller"

let blogPostRepo = new BlogPostRepository();

class BlogPostFactory{
  makeGetPost(){
    let presenter = new GetBlogpostPresenter();  
    let interactor = new GetBlogPostInteractor(presenter, blogPostRepo);  
    let controller = new GetBlogpostController(interactor);
    return controller;  
  }
  makeSetPost(){
    let presenter = new SetBlogpostPresenter(),
        interactor = new SetBlogPostInteractor(presenter, blogPostRepo),
        controller = new SetBlogPostController(interactor);
    return controller;
  }
}


export const blogpostFactory = new BlogPostFactory();