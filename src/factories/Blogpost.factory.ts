import { GetBlogpostController } from "@/controllers/getBlogPost.controller";
import GetBlogPostInteractor from "@/interactors/getBlogPost.interactor";
import SetBlogPostInteractor from "@/interactors/setBlogPost.interactor";
import { GetBlogpostPresenter } from "@/presenters/getBlogPost.presenter";
import { BlogPostRepository } from "@/repositories/BlogPost.repository";

import {SetBlogpostPresenter} from "@/presenters/setBlogPost.presenter"
import {SetBlogPostController} from "@/controllers/setBlogPost.controller"
import {GetBlogpostsGroupPresenter, GetBlogpostsMinGroupPresenter} from "@/presenters/getBlogpostsGroup.presenter";
import { GetBlogPostsGroup } from "@/interactors/getBlogpostsGroup.interactor";
import GetBlogPostsGroupController from "@/controllers/getBlogPosts.controller";
import { getExistedBlogPostLengthPresenter } from "@/presenters/getExistedBlogPostLength.presenter";
import { getExistedBlogPostsLength } from "@/interactors/getBlogPostsLength.interactor";
import { GetExistedBlogPostsLengthController } from "@/controllers/getExistedBlogPostsLength.controller";

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
  makeGetPostsGroup(){
    let presenter = new GetBlogpostsGroupPresenter();
    let presenterMin = new GetBlogpostsMinGroupPresenter();
    let interactor = new GetBlogPostsGroup(presenterMin, blogPostRepo);
    let controller = new GetBlogPostsGroupController(interactor);
    return controller;
  }
  makeGetPostsLength(){
    let presenter = new getExistedBlogPostLengthPresenter();
    let interactor = new getExistedBlogPostsLength(presenter, blogPostRepo);
    let controller = new GetExistedBlogPostsLengthController(interactor);
    return controller;
  }
}


export const blogpostFactory = new BlogPostFactory();