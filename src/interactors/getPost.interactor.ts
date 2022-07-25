import { DBError } from "@/common/customErrors";
import { BlogPostParams } from "@/common/postParams";
import { BlogPost } from "@/Entities/BlogPost";
import { BlogPostVM } from "@/ViewModels/BlogPostVM";
import {BlogPostGateway } from "./common/db.gateway";


export default class GetUserInteractor implements GetBlogPostInputPort{
  postGateway: Partial<BlogPostGateway>;
  outputPort: GetBlogPostOutputPort;
  constructor(outputPort : GetBlogPostOutputPort, postGateway: BlogPostGateway){
    this.outputPort = outputPort;
    this.postGateway = postGateway;
  }

  async execute(params: BlogPostParams): Promise<BlogPostVM> {
    try{
      let data = await this.postGateway.getPost!(params);
      if(!data || !data.id){
        throw new DBError("post not found");
      }
      return this.outputPort.present(data)
    } catch (e){
      throw e
    }
  }
}


export interface GetBlogPostInputPort{
  postGateway : Partial<BlogPostGateway>;
  outputPort : GetBlogPostOutputPort;
  execute(params : BlogPostParams) : Promise<BlogPostVM>
}

export interface GetBlogPostOutputPort{
  present(data : BlogPost) : BlogPostVM
}