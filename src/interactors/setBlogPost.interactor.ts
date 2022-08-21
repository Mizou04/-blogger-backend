import { DBError } from "@/common/customErrors";
import { BlogPostParams } from "@/common/BlogPostParams";
import { BlogPost, TBlogpost } from "@/Entities/BlogPost";
import { BlogPostGateway } from "./common/db.gateway";


export default class SetBlogPostInteractor implements SetBlogPostInputPort{
  outputPort : SetBlogPostOutputPort;
  gateway : BlogPostGateway;
  constructor(outputPort : SetBlogPostOutputPort, BlogPostRepository : BlogPostGateway){
    this.outputPort = outputPort;
    this.gateway = BlogPostRepository;
  }
  async execute(params: TBlogpost): Promise<null> {
    try {
      let myPost = BlogPost.create(params);
      await this.gateway.setBlogPost(myPost);
      return this.outputPort.present(myPost);
    } catch (e) {
      throw e
    }
  }
}

export interface SetBlogPostInputPort{
  readonly outputPort : SetBlogPostOutputPort,
  readonly gateway : BlogPostGateway
  execute(post : TBlogpost) : Promise<null>
}

export interface SetBlogPostOutputPort{
  present(something? : any) : null
}

