import { BlogPostMinResponseDTO } from "@/common/DTOs/BlogPost/BlogPostResponseDTO";
import { getBlogPostsGroupOutputPort } from "@/interactors/getBlogpostsGroup.interactor";
import { BlogPostMinVM } from "@/ViewModels/BlogPostVM";
import { UserMinVM } from "@/ViewModels/UserVM";

export default class GetBlogPostPresenter implements getBlogPostsGroupOutputPort{
  present(data: { blogpostRes: BlogPostMinResponseDTO[], usersRes : UserMinVM[] }): BlogPostMinVM[] {
    let ret : BlogPostMinVM[] = [];
    for(let i = 0; i < data.blogpostRes.length; i++){
      for(let j = 0; j < data.usersRes.length; j++){
        if(data.blogpostRes[i].ownerId !== data.usersRes[j].id){
          continue;
        } else {
          ret.push(new BlogPostMinVM({blogpostRes : data.blogpostRes[i], userRes : data.usersRes[j]}));
        }
      }
    }
    return ret;
  }
}