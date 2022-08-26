import { getExistedBlogPostsLengthInputPort } from "@/interactors/getBlogPostsLength.interactor";



export class GetExistedBlogPostsLengthController{
  constructor(public getExistedBlogPostsLengthInputPort : getExistedBlogPostsLengthInputPort){
    this.getExistedBlogPostsLengthInputPort = getExistedBlogPostsLengthInputPort;
  }

  async execute(filter? : any){
    try {
      return await this.getExistedBlogPostsLengthInputPort.execute(filter);
    } catch (error) {
      throw error
    }
  }
}