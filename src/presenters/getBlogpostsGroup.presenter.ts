import { BlogPost } from "@/Entities/BlogPost";
import { getBlogPostsGroupOutputPort } from "@/interactors/getBlogpostsGroup.interactor";
import { BlogPostMinVM, BlogPostVM } from "@/ViewModels/BlogPostVM";


export class GetBlogpostsGroupPresenter implements getBlogPostsGroupOutputPort{
  present(data: BlogPost[]): BlogPostVM[] | BlogPostMinVM[] {
    return data.map(v => new BlogPostVM(v));
  }
}
export class GetBlogpostsMinGroupPresenter implements getBlogPostsGroupOutputPort{
  present(data: BlogPost[]): BlogPostVM[] | BlogPostMinVM[] {
    let ret = [];
    for(let i = 0; i < data.length; i++){
      ret.push(new BlogPostMinVM(data[i]))
    }
    return ret;
  }
}