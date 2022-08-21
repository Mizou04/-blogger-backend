import { SetBlogPostInputPort } from "@/interactors/setBlogPost.interactor";
import { TBlogpost } from "@/Entities/BlogPost";
import { InvalidInputError } from "@/common/customErrors";

export class SetBlogPostController{
  inputPort : SetBlogPostInputPort;
  constructor(inputPort : SetBlogPostInputPort){
    this.inputPort = inputPort;
  }
  async execute(params : TBlogpost){
    try {
      if(!params || !params.title) throw new InvalidInputError("not valid input")
      return await this.inputPort.execute(params);
    } catch (e) {
      throw e
    }
  }
}