import { GetBlogpostController } from "@/controllers/getBlogPost.controller";
import GetBlogPostInteractor from "@/interactors/getPost.interactor";
import { GetBlogpostPresenter } from "@/presenters/GetBlogPost.presenter";
import { PostRepository } from "@/repositories/Post.repository";

let postRepo = new PostRepository();

class BlogPostFactory{
  makeGetPost(){
    let presenter = new GetBlogpostPresenter();  
    let interactor = new GetBlogPostInteractor(presenter, postRepo);  
    let controller = new GetBlogpostController(interactor);
    return controller;  
  }
}


export const blogpostFactory = new BlogPostFactory();