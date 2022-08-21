import { BlogPostParams } from "@/common/BlogPostParams";
import { GetBlogPostInputPort } from "@/interactors/getBlogPost.interactor";

export class GetBlogpostController{
  inputPort : GetBlogPostInputPort;
  constructor(inputPort : GetBlogPostInputPort){
    this.inputPort = inputPort;
  }
  async execute(params : BlogPostParams){
    try {
      return await this.inputPort.execute(params);
    } catch (e) {
      throw e
    }
  }
}