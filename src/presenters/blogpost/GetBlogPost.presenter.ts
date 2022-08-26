import { BlogPostResponseDTO } from "@/common/DTOs/BlogPost/BlogPostResponseDTO";
import { GetBlogPostOutputPort } from "@/interactors/getBlogPost.interactor";
import { BlogPostVM } from "@/ViewModels/BlogPostVM";
import { CommentVM } from "@/ViewModels/CommentVM";
import { UserMinVM } from "@/ViewModels/UserVM";

export default class GetBlogPostPresenter implements GetBlogPostOutputPort{
  present(data: { blogpostRes: BlogPostResponseDTO; commentsRes: CommentVM[]; userResponse: UserMinVM; }): BlogPostVM {
    return new BlogPostVM(data);
  }
}