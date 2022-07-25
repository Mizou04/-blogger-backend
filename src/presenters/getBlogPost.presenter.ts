import { BlogPost } from "@/Entities/BlogPost";
import { GetBlogPostOutputPort } from "@/interactors/getPost.interactor";
import { BlogPostVM } from "@/ViewModels/BlogPostVM";

export class GetBlogpostPresenter implements GetBlogPostOutputPort{
  present(data: BlogPost): BlogPostVM {
    return new BlogPostVM(data);
  }
}