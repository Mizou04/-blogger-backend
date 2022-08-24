import { BlogPost } from "@/Entities/BlogPost";
import { getBlogPostsGroupOutputPort } from "@/interactors/getBlogpostsGroup.interactor";
import { BlogPostVM } from "@/ViewModels/BlogPostVM";


export default class GetBlogpostsGroupPresenter implements getBlogPostsGroupOutputPort{
  present(data: BlogPost[]): BlogPostVM[] {
    return data.map(v => new BlogPostVM(v));
  }
}