import { BlogPost } from "@/Entities/BlogPost";
import { SetBlogPostOutputPort } from "@/interactors/setBlogPost.interactor";
import { BlogPostVM } from "@/ViewModels/BlogPostVM";

export class SetBlogpostPresenter implements SetBlogPostOutputPort{
  present(something?: any): null {
    return null
  }
}