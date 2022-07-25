import { BlogPostParams } from "@/common/postParams";
import { GetBlogPostInputPort } from "@/interactors/getPost.interactor";

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