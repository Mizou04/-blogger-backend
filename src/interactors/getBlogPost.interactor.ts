import { DBError } from "@/common/customErrors";
import { BlogPostParams } from "@/common/BlogPostParams";
import BlogPost from "@/Entities/BlogPost";
import { BlogPostVM} from "@/ViewModels/BlogPostVM";
import {BlogPostGateway } from "./_common/db.gateway";
import { BlogPostResponseDTO } from "@/common/DTOs/BlogPost/BlogPostResponseDTO";
import { CommentVM } from "@/ViewModels/CommentVM";
import { UserMinVM } from "@/ViewModels/UserVM";
import { BaseInteractor } from "./_common/BaseInteractor";
import { GetUserInputPort } from "./getUser.interactor";
import { GetUsersInputPort } from "./getUsers.interactor";
import Comment from "@/Entities/Comment";
import { userParams } from "@/common/userParams";
import { GetCommentsInputPort } from "./comment/getComments.interactor";


export default class GetBlogPostInteractor implements GetBlogPostInputPort{
  postGateway: BlogPostGateway;
  outputPort: GetBlogPostOutputPort;
  constructor(
    outputPort : GetBlogPostOutputPort, 
    postGateway: BlogPostGateway,
    private getUserInputPort : GetUserInputPort,
    private getCommentsInputPort : GetCommentsInputPort
    ){
    this.outputPort = outputPort;
    this.postGateway = postGateway;
    this.getUserInputPort = getUserInputPort;
    this.getCommentsInputPort = getCommentsInputPort;
  }

  async execute(params: BlogPostParams): Promise<BlogPostVM> {
    try{
      let postDTO : BlogPostResponseDTO = await this.postGateway.getBlogPost(params);
      let userVM = await this.getUserInputPort.execute({userParams : {id : postDTO.ownerId}, complete : false});
      let commentsVM = await this.getCommentsInputPort.execute({postId : postDTO.id as string});
      return this.outputPort.present({blogpostRes : postDTO, commentsRes : commentsVM, userResponse : userVM})
    } catch (e){
      throw e
    }
  }
}


export interface GetBlogPostInputPort extends BaseInteractor<BlogPostParams, Promise<BlogPostVM>>{
  postGateway : Partial<BlogPostGateway>;
  outputPort : GetBlogPostOutputPort;
}

export interface GetBlogPostOutputPort{
  present(data : {blogpostRes : BlogPostResponseDTO, commentsRes : CommentVM[], userResponse : UserMinVM}) : BlogPostVM
}